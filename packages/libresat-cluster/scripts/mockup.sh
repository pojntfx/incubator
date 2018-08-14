# Add Traefik ingress by default? To use, following variables would work:
satctl create cluster cloud1 \
  --host 142.93.112.103
  --user root
  --domain libresat.space
  --email test@libresat.space

satctl create cloud cloud1
satctl get clouds
satctl apply -f resource.yml

satctl apply -f cloud.yml
satctl apply -f https://git.libresat.space/snippets/235/raw
satctl get clouds
satctl delete cloud

# kind: Cloud
# apiVersion: https://opensdcp.libresat.space/standards/v1/cloud
# metadata:
# spec:

# cloud | cluster | 

# cloud1 | cluster1 | node1 | storage1 | network1

# compute | storage | networking

# cloud1 > cluster1 > ( node1, storage1, network1 )

# [Infrastructure]
# Compute
# Storage
# Networking

# Compute -> Nodes

# satctl manages platform (libresat) & service (kubernetes) resources.
# this means this will work:
satctl get clouds
satctl get clusters
satctl get volumes
satctl get repos
satctl get registrars
satctl get nameservers
satctl get deployments
satctl get organisations
satctl get users
satctl get services
satctl apply -f https://git.libresat.space/snippets/3423.yml
satctl apply -f deployment.yml
satctl apply -f cloud.yml
satctl apply -f cluster.yml

satctl microplatform create cluster \
  --storage.digitalocean.apikey="asdf1" \
  --https.email="you@example.com" \
  --https.domains="*.example.com" \
  --https.gandiv5.apikey="asdf2" \
  --with-examples

storage.provider="digitalocean" # or NFS
storage.apikey="apikey1" # Or username:password

dns.provider="gandi" # Or HTTPS
dns.apikey="apikey2" # Or nothing

https.email="user@example.com"
https.domains="*.staging1.example.com" # Or single domain

starter.yaml="https://gitlab.com/snippets/1742851/raw"