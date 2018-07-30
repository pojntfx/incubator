FROM debian:latest

# Update the system
RUN apt update
RUN apt upgrade -y

# Install dependencies
RUN apt install -y wget git openssh-server
RUN wget -qO- https://get.haskellstack.org/ | sh

# Setup environment
RUN mkdir /gitit
WORKDIR /gitit

# Install gitit
RUN git clone https://github.com/jgm/gitit
RUN cd gitit && stack install

# Setup SSH
RUN sed -i -e "s/#PubkeyAuth/PubkeyAuth/g" /etc/ssh/sshd_config
RUN sed -i -e "s/#PermitRootLogin prohibit-password/PermitRootLogin yes/g" /etc/ssh/sshd_config

# Create git user (for cloning the wiki)
RUN useradd -m git

# Configure SSH access (for cloning the wiki)
RUN mkdir /home/git/.ssh
COPY assets/id_rsa.pub /home/git/.ssh/authorized_keys
RUN chmod 600 /home/git/.ssh/authorized_keys
RUN chown git /home/git/.ssh/authorized_keys

# Get templates and static files
COPY assets/static /gitit/static
COPY assets/templates /gitit/templates

# Configure locale
ENV LC_ALL="C.UTF-8"
ENV LANG="en_US.UTF-8"
ENV LANGUAGE="en_US.UTF-8"

# Build and serve the wiki over the web interface, start SSH server
CMD /etc/init.d/ssh start && /root/.local/bin/gitit

# Expose the web interface and SSH server
EXPOSE 5001 22