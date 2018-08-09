# Storage Class
# You can use anything here, even NFS

echo \
"apiVersion: v1
kind: Secret
metadata:
  name: digitalocean
  namespace: kube-system
stringData:
  access-token: "a05dd2f26b9b9ac2asdas__REPLACE_ME____123cb5d1ec17513e06da"
" > secret.yml
kubectl create -f ./secret.yml
kubectl apply -f https://raw.githubusercontent.com/digitalocean/csi-digitalocean/master/deploy/kubernetes/releases/csi-digitalocean-latest-stable.yaml

# Ingress

# Configure your DNS like this:
# A * -> @
# A libresat.space -> 142.93.112.103

# Create ingress controller
kubectl apply -f https://raw.githubusercontent.com/containous/traefik/master/examples/k8s/traefik-rbac.yaml
kubectl apply -f https://raw.githubusercontent.com/containous/traefik/master/examples/k8s/traefik-ds.yaml
kubectl --namespace=kube-system get pods -w # -> traefik-ingress-controller-(...)          1/1       Running   0          45s

# Check if it is running
kubectl get service traefik-ingress-service -n kube-system # -> traefik-ingress-service   ClusterIP   10.101.184.133   <none>        80/TCP,8080/TCP   1h
curl libresat.space:30076 # -> 404

# Deploy example service and ingress ("entrypoint") that exposes the traefik web ui and 3 other services
kubectl apply -f https://gitlab.com/snippets/1742851/raw
