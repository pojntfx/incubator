#! /bin/bash

# To start this on any system with Debian >= 9 (stretch), run:
# wget -q -O - https://gitlab.com/snippets/1741965/raw | bash
# If you don't even want log in, run the following (replace your IP, of course):
# ssh root@142.93.140.189 "wget -q -O - https://gitlab.com/snippets/1741965/raw | bash"

LIBRESAT_PLATFORM_VERSION="0.0.1-0"

update_caches() {
  DEBIAN_FRONTEND="noninteractive"
  apt update && apt upgrade -y
}

install_basics() {
  apt install -y curl software-properties-common apt-transport-https
}

configure_repositories() {
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
  add-apt-repository "deb https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"
  curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
  echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list
}

enable_auto_updates() {
  DEBIAN_FRONTEND="noninteractive"
  debconf-set-selections <<< "unattended-upgrades unattended-upgrades/enable_auto_updates boolean true"
  debconf-set-selections <<< "unattended-upgrades unattended-upgrades/origins_pattern string origin=Debian,codename=${distro_codename},label=Debian-Security"
  apt install -y unattended-upgrades apt-listchanges
}

install_docker() {
  apt install -y docker-ce=$(apt-cache madison docker-ce | grep 17.03 | head -1 | awk '{print $3}')
}

start_docker() {
  service docker start
}

install_kubernetes() {
  apt install -y kubelet kubeadm kubectl
  apt-mark hold kubelet kubeadm kubectl
}

install_dependencies() {
  printf "\033[0;32mInstalling dependencies ...\033[0m\n"
  update_caches
  install_basics
  configure_repositories
  update_caches
  enable_auto_updates
  install_docker
  start_docker
  install_kubernetes
}

initialize_master() {
  printf "\033[0;32mInitializing cluster ...\033[0m\n"
  sysctl net.bridge.bridge-nf-call-iptables=1
  kubeadm config images pull
  kubeadm init --pod-network-cidr=10.244.0.0/16
  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config
}

install_pod_network_addon() {
  printf "\033[0;32mConfiguring networking ...\033[0m\n"
  kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/v0.10.0/Documentation/kube-flannel.yml
}

enable_pod_scheduling_on_master() {
  printf "\033[0;32mEnabling pod scheduling on master ...\033[0m\n"
  kubectl taint nodes --all node-role.kubernetes.io/master-
}

install_dashboard() {
  printf "\033[0;32mInstalling Kubernetes Dashboard ...\033[0m\n"
  kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml
  kubectl create -f https://gitlab.com/snippets/1741994/raw
  kubectl create -f https://gitlab.com/snippets/1741993/raw
}

show_node_token() {
  printf "\033[0;32mRun this on all additional nodes you wish to use (expires in 24h):\n"
  LIBRESAT_PLATFORM_JOIN_TOKEN=$(kubeadm token list | awk '/TOKEN/{getline; print}' | cut -d" " -f1)
  LIBRESAT_PLATFORM_HOST_IP=$(hostname -I | cut -d" " -f1)
  LIBRESAT_PLATFORM_JOIN_CERTIFICATE=$(openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | \
   openssl dgst -sha256 -hex | sed 's/^.* //')
  printf "kubeadm join \ \n--token ${LIBRESAT_PLATFORM_JOIN_TOKEN} \ \n${LIBRESAT_PLATFORM_HOST_IP}:10250 \ \n--discovery-token-ca-cert-hash sha256:${LIBRESAT_PLATFORM_JOIN_CERTIFICATE}\033[0m\n"
}

show_kubectl_local_instructions() {
  printf "\033[0;32mRun this to connect to the cluster using kubectl from your workstation:\033[0m\n"
  printf "\033[0;32mscp root@${LIBRESAT_PLATFORM_HOST_IP}:/etc/kubernetes/admin.conf . && kubectl --kubeconfig ./admin.conf get nodes\033[0m\n"
}

proxy_api_server_to_localhost() {
  printf "\033[0;32mRun this to proxy the API server your workstation at http://localhost:8001/api/v1:\033[0m\n"
  printf "\033[0;32mscp root@\${LIBRESAT_PLATFORM_HOST_IP}:/etc/kubernetes/admin.conf . && kubectl --kubeconfig ./admin.conf proxy\033[0m\n\n"
  printf "\033[0;32mAfterwards, you can access the Kubernetes Dashboard at http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/\033[0m\n"
  printf "\033[0;32mGet the access token by running: kubectl --kubeconfig admin.conf -n kube-system describe secret \$(kubectl --kubeconfig admin.conf -n kube-system get secret | grep admin-user | awk '{print \$1}')\033[0m\n"
}

start() {
  printf "\033[0;32mLibreSat Platform Setup v.${LIBRESAT_PLATFORM_VERSION}\033[0m\n"
  install_dependencies
  initialize_master
  install_pod_network_addon
  enable_pod_scheduling_on_master
  install_dashboard
  show_node_token
  show_kubectl_local_instructions
  proxy_api_server_to_localhost
  printf "\033[0;32mLibreSat Platform Setup v.${LIBRESAT_PLATFORM_VERSION} finished successfully.\033[0m\n"
  printf '\033[0;32mHave a nice day!\033[0m\n'
}

start