FROM debian:stretch
LABEL maintainer="Felix Pojtinger <felix@pojtinger.com> @pojntfx"

# Update the system
RUN apt update
RUN apt upgrade -y

### START postfix ###

# Setup mailname
ENV POSTFIX_DOMAIN="forum.stg1.libresat.space"

# Setup debconf
ENV EXTERNAL_SMTP_DOMAIN="mail.gandi.net"
ENV DEBIAN_FRONTEND="noninteractive"

# Add password and username for smarthost
ENV EXTERNAL_SMTP_USERNAME="test@libresat.space"
ENV EXTERNAL_SMTP_PASSWORD="345lkUDfg03jd~"

# Configure postfix
COPY assets/postfix/main.cf .

### END postfix ###

### START mailman-core ###

# Install dependencies
RUN apt install -y lynx git python3 python3-setuptools

# Configure mailman
ENV MAILMAN_ADMIN_EMAIL="felix@pojtinger.com"
ENV MAILMAN_ADMIN_USERNAME="pojntfx"
ENV MAILMAN_ADMIN_PASSWORD="asdfasdf123"
ENV MAILMAN_DEFAULT_LANGUAGE="en"
ENV MAILMAN_DOMAIN="forum.stg1.libresat.space"

# Install dependencies
RUN apt install -y lynx git python3 python3-setuptools

# Setup mailman-core environment and get sources
WORKDIR /opt
RUN git clone https://gitlab.com/mailman/mailman.git
RUN mv mailman mailman-core
WORKDIR mailman-core

# Add mailman config
COPY assets/mailman-core/mailman.cfg .
RUN cat mailman.cfg >>/etc/mailman.cfg
ENV MAILMAN_CONFIG_FILE="/etc/mailman.cfg"

# Install mailman-core
RUN python3 setup.py install

# Add custom templates
COPY assets/mailman-core/templates /var/tmp/mailman

# Create a volume for mailman's data
VOLUME /var/tmp/mailman/data

# Setup locale
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

### END mailman-core ###

### START mailman-core-hyperkitty-plugin ###

# Configure mailman-core-hyperkitty-plugin
ENV HYPERKITTY_API_KEY="asdfasdf474"

# Setup mailman-core-hyperkitty-plugin environment and get sources
WORKDIR /opt
RUN git clone https://gitlab.com/mailman/mailman-hyperkitty.git
RUN mv mailman-hyperkitty mailman-core-hyperkitty-plugin
WORKDIR mailman-core-hyperkitty-plugin

# Install mailman-core-hyperkitty-plugin
RUN python3 setup.py install

# Add mailman-core-hyperkitty-plugin config
COPY assets/mailman-core-hyperkitty-plugin/mailman-core-hyperkitty-plugin.cfg .
RUN cat mailman-core-hyperkitty-plugin.cfg >>/etc/mailman-core-hyperkitty-plugin.cfg

### END mailman-core-hyperkitty-plugin ###

### START hyperkitty ###

# Setup hyperkitty environment and get sources
WORKDIR /opt
RUN git clone https://gitlab.com/mailman/hyperkitty.git
WORKDIR hyperkitty

# Install dependencies
RUN apt install -y gcc sassc python3-dev python3-pip apache2 libapache2-mod-wsgi-py3
RUN pip3 install Whoosh django-q==0.9.4 # django_q now uses AsyncTask instead of Async, but this will be fixed soon (see https://gitlab.com/mailman/hyperkitty/issues/190)

# Install hyperkitty
RUN python3 setup.py install

### END hyperkitty ###

### START postorius ###

# Setup postorius environment and get sources
WORKDIR /opt
RUN git clone https://gitlab.com/mailman/postorius.git
WORKDIR postorius

# Install postorius
RUN python3 setup.py install

### END postorius ###

### START mailman-web ###

# Configure mailman-web
ENV HYPERKITTY_ADMIN_USERNAME="Felix Pojtinger"
ENV HYPERKITY_ADMIN_EMAIL="felix@pojtinger.com"
ENV DJANGO_ADMIN_EMAIL="goooglehupf007@gmail.com"
ENV DJANGO_ADMIN_USERNAME="pojntfx"
ENV DJANGO_ADMIN_PASSWORD="supersecurepassword"

# Setup mailman-web environment
WORKDIR /opt
RUN mkdir mailman-web
WORKDIR /opt/mailman-web

# Add mailman-web config
COPY assets/mailman-web/settings.py .
COPY assets/mailman-web/manage.py .
COPY assets/mailman-web/urls.py .
COPY assets/mailman-web/wsgi.py .
COPY assets/mailman-web/apache.conf .

# Setup mailman-web

# Add volume for mailman-web's data
VOLUME /opt/mailman-web

# Restart apache
RUN mkdir /var/log/httpd/
RUN a2enmod wsgi

### END mailman-web ###

### START startup ###

# Expose postfix, hyperkitty and mailman-core
EXPOSE 25 7000 8024

# Start everything
WORKDIR /opt
COPY assets/run.sh .
RUN chmod +x run.sh
CMD bash -c "./run.sh"

### END startup ###
