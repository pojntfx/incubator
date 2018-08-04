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
ENV GIT_REMOTE="git@gitlab.com:pojntfx/git-wikidata-test.git"
RUN ssh-keyscan -t rsa $(echo $GIT_REMOTE | cut -d"@" -f 2| cut -d":" -f 1) >> ~/.ssh/known_hosts
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

# Create dir and file to save users into, (make sure that user-file) is set to userdata/gitit-users in assets/gitit.conf
RUN mkdir userdata

# Add gitit config file
COPY assets/gitit.conf /gitit

# Configure locale
ENV LC_ALL="C.UTF-8"
ENV LANG="en_US.UTF-8"
ENV LANGUAGE="en_US.UTF-8"

# Install sendmail and auth services
RUN apt install -y sendmail sendmail-bin sensible-mda sasl2-bin cron

# Configure sendmail connection details
ENV EXTERNAL_SMTP_DOMAIN="mail.gandi.net"
RUN echo "dnl define(\`SMART_HOST', \`${EXTERNAL_SMTP_DOMAIN}')" >> /etc/mail/sendmail.mc
# Configure sendmail authentication
ENV EXTERNAL_SMTP_USERNAME="noreply@libresat.space"
ENV EXTERNAL_SMTP_PASSWORD="249j89aSf8234ns@#234"
RUN echo "AuthInfo:${EXTERNAL_SMTP_DOMAIN} \"U:${EXTERNAL_SMTP_USERNAME}\" \"P:${EXTERNAL_SMTP_PASSWORD}\" \"M:PLAIN\"" >> /etc/mail/authinfo
RUN makemap hash /etc/mail/authinfo < /etc/mail/authinfo
RUN sed -i s/"MAILER_DEFINITIONS"/"FEATURE(\`authinfo')\nMAILER_DEFINITIONS"/g /etc/mail/sendmail.mc
RUN make -C /etc/mail
RUN sed -i s/START=no/START=yes/g /etc/default/saslauthd

# Add periodical git fetch cron job so that the instances will be kept in sync
RUN echo "cd /gitit/wikidata/ && git checkout master && git pull && git checkout dev && git merge master && cd /gitit" >> pull_latest_changes.sh
RUN chmod +x pull_latest_changes.sh
RUN echo "* * * * * root cd /gitit && ./pull_latest_changes.sh" >> /etc/cron.d/gitit-with-ssh
RUN /etc/init.d/cron restart

# Pull latest changes from the remote, build and serve the wiki over the web interface, start SSH server, start sendmail server
CMD ./pull_latest_changes.sh && service saslauthd start && /etc/init.d/ssh start && /root/.local/bin/gitit -f gitit.conf && make -C /etc/mail && /etc/init.d/sendmail start && make -C /etc/mail && /etc/init.d/sendmail start

# Expose the web interface and SSH server
EXPOSE 5001 22