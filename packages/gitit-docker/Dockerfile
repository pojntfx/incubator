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
# RUN sed -i -e "s/#PermitRootLogin prohibit-password/PermitRootLogin yes/g" /etc/ssh/sshd_config

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

# Prepare git bot
# Generate SSH public and secret key w/ empty PW: ssh-keygen -t rsa -N "" -f "/root/.ssh/id_rsa"
RUN ssh-keygen -t rsa -N "" -f "/root/.ssh/id_rsa"
# Echo public key (add to bot account, add bot account as "admin" member of wikidata repo on GitLab, GitHub etc.):
RUN echo "\033[0;31m>>> USER ACTION REQUIRED: CREATE A GITLAB/GITHUB USER, GRANT ACCESS TO WIKIDATA REPO, ADD FOLLOWING PUBLIC SSH KEY TO PROFILE <<<\033[0m"
RUN cat ~/.ssh/id_rsa.pub
RUN echo "\033[0;31mWe will sleep for a minute now so that you can copy the SSH public key to GitLab/GitHub\033[0m"
RUN sleep 1m

# Configure git bot
ENV GIT_BOT_EMAIL="gitit-bot@libresat.space"
ENV GIT_BOT_NAME="LibreSat Gitit Bot"
RUN git config --global user.email ${GIT_BOT_EMAIL}
RUN git config --global user.name "${GIT_BOT_NAME}"

# Get the remote repo
# Add GitLab to known_hosts
# TODO: Get remote's host dynamically and insert below
RUN ssh-keyscan -t rsa gitlab.com >> ~/.ssh/known_hosts
ENV GIT_REMOTE="git@gitlab.com:pojntfx/git-wikidata-test.git"
RUN git clone ${GIT_REMOTE}
# Rename the repo to "wikidata"
RUN mv $(echo $GIT_REMOTE | cut -d"/" -f 2| cut -d"." -f 1) wikidata
# Create master branch
RUN cd wikidata && git checkout -b dev && cd ..

# Add pre-commit hook
COPY assets/pre-commit wikidata/.git/hooks/pre-commit
RUN chmod +x wikidata/.git/hooks/pre-commit

# Add post-commit hook
COPY assets/post-commit wikidata/.git/hooks/post-commit
RUN chmod +x wikidata/.git/hooks/post-commit

# Configure locale
ENV LC_ALL="C.UTF-8"
ENV LANG="en_US.UTF-8"
ENV LANGUAGE="en_US.UTF-8"

# Build and serve the wiki over the web interface, start SSH server
CMD /etc/init.d/ssh start && /root/.local/bin/gitit

# Expose the web interface and SSH server
EXPOSE 5001 22