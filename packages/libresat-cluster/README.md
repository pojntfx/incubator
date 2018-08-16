# LibreSat Infrastructure

## Prerequisites

A 1GB RAM & 1 CPU host should be enough.

## Usage

### Configuration

> Use your own IP (or domain) instead of `206.189.226.226` in the following.

### Setup DNS

| Type  | Hostname | Value                |
| ----- | -------- | -------------------- |
| A     | stg1     | 206.189.226.226      |
| CNAME | \*.stg1  | stg1.libresat.space. |

### Create Cluster

```bash
ssh root@206.189.226.226 "wget -q -O - https://gitlab.com/snippets/1741965/raw | bash"
```

### Setup `kubectl`

> Run the command that you got as the output from [Create Cluster](#Create%20Cluster) on your workstation, which looks like this:

```bash
# To setup kubectl on your local machine:
scp root@206.189.226.226:/etc/kubernetes/admin.conf ${HOME}/.kube/config-206.189.226.226.conf
export KUBECONFIG=${HOME}/.kube/config-206.189.226.226.conf
```

### Enable Persistent Volumes

```bash
# You can use another storage provider (i.e. NFS) instead of DigitalOcean here
kubectl apply -f https://raw.githubusercontent.com/digitalocean/csi-digitalocean/master/deploy/kubernetes/releases/csi-digitalocean-latest-stable.yaml
kubectl apply -f kubeadm-cluster/storage.yaml
kubectl --namespace=kube-system get pods -w # -> csi-provisioner-doplugin-0-(...)          1/1       Running   0          2m
```

### Create Ingress Controller

```bash
kubectl apply -f kubeadm-cluster/traefik.yaml
kubectl --namespace=kube-system get pods -w # -> traefik-ingress-controller-(...)          1/1       Running   0          53s
```

### Test if Ingress Controller is working

```bash
curl http://whatever.stg1.libresat.space # -> 404 page not found -> It works!
```

### Deploy Example Services and Ingress ("Entrypoints")

```bash
kubectl apply -f kubeadm-cluster/examples.yaml
```

### Test whether it worked

```bash
curl http://stg1.libresat.space # -> <html>(...)</html> -> It works!
curl https://stg1.libresat.space # -> <html>(...)</html> -> It works!
curl https://traefik-ui.stg1.libresat.space # -> <html>(...)</html> -> It works!
curl https://cheddar.stg1.libresat.space # -> <html>(...)</html> -> It works!
curl https://stilton.stg1.libresat.space # -> <html>(...)</html> -> It works!
curl https://wensleydale.stg1.libresat.space # -> <html>(...)</html> -> It works!
```
