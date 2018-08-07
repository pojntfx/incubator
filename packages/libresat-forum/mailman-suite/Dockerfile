FROM debian:stretch
LABEL maintainer="Felicitas Pojtinger <felicitas@pojtinger.com> @pojntfx"

# Update the system
RUN apt update
RUN apt upgrade -y

# Setup mailname
ARG EXIM_DOMAIN="mail.libresat.space"
RUN echo ${EXIM_DOMAIN} > /etc/mailname

# Setup debconf
ARG EXTERNAL_SMTP_DOMAIN="mail.gandi.net"
ENV DEBIAN_FRONTEND="noninteractive"
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/mailname  string ${EXIM_DOMAIN}\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_minimaldns boolean false\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_localdelivery select mbox format in /var/mail/\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/hide_mailname boolean false\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_postmaster string root\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_eximconfig_configtype select mail sent by smarthost; received via SMTP or fetchmail\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_smarthost string ${EXTERNAL_SMTP_DOMAIN}\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_other_hostnames string ${EXIM_DOMAIN}\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/use_split_config boolean false\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/no_config boolean true\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_local_interfaces string 127.0.0.1\""
RUN bash -c "debconf-set-selections <<< \"exim4-base exim4/purge_spool boolean false\""

# Install dependencies
RUN apt install -y exim4 mailutils

# Add password and username for smarthost
ARG EXTERNAL_SMTP_USERNAME="test@libresat.space"
ARG EXTERNAL_SMTP_PASSWORD="345lkUDfg03jd~"
RUN echo "${EXTERNAL_SMTP_DOMAIN}:${EXTERNAL_SMTP_USERNAME}:${EXTERNAL_SMTP_PASSWORD}" >> /etc/exim4/passwd.client
RUN update-exim4.conf

# Restart exim
RUN service exim4 restart

# Install dependencies
RUN apt install -y lynx git python3 python3-setuptools

### END exim ###



### START mailman-core ###

# Prepare environment

# Setup mailman-core environment and get sources
WORKDIR /opt
RUN git clone https://gitlab.com/mailman/mailman.git
RUN mv mailman mailman-core
WORKDIR mailman-core

# Add mailman config
COPY assets/mailman-core/mailman.cfg .
RUN cat mailman.cfg >> /etc/mailman.cfg
ENV MAILMAN_CONFIG_FILE="/etc/mailman.cfg"

# Configure mailman
ARG MAILMAN_ADMIN_EMAIL="felicitas@pojtinger.com"
ARG MAILMAN_ADMIN_USERNAME="pojntfx"
ARG MAILMAN_ADMIN_PASSWORD="asdfasdf123"
ARG MAILMAN_DEFAULT_LANGUAGE="en"
ARG MAILMAN_DOMAIN="forum.libresat.space"
# ARG MAILMAN_USE_HTTPS="no"
RUN sed -i -e "s/site_owner: changeme@example.com/site_owner: ${MAILMAN_ADMIN_EMAIL}/g" /etc/mailman.cfg
RUN sed -i -e "s/default_language: en/default_language: ${MAILMAN_DEFAULT_LANGUAGE}/g" /etc/mailman.cfg
# RUN sed -i -e "s/use_https: no/use_https: ${MAILMAN_USE_HTPPS}/g" /etc/mailman.cfg
RUN sed -i -e "s/admin_user: mailman-rest-admin/admin_user: ${MAILMAN_ADMIN_USERNAME}/g" /etc/mailman.cfg
RUN sed -i -e "/admin_pass/c\admin_pass: ${MAILMAN_ADMIN_PASSWORD}" /etc/mailman.cfg
RUN sed -i -e "s/incoming: mailman.mta.postfix.LMTP/#incoming: mailman.mta.postfix.LMTP/g" /etc/mailman.cfg
RUN sed -i -e "s/#incoming: mailman.mta.exim4.LMTP/incoming: mailman.mta.exim4.LMTP/g" /etc/mailman.cfg
# Probably lmtp_host: mail.libresat.space and smtp_host: mail.libresat.space, but let's try local first!
RUN sed -i -e "s/configuration: python:mailman.config.postfix/#configuration: python:mailman.config.postfix/g" /etc/mailman.cfg
RUN sed -i -e "s/#configuration: python:mailman.config.exim4/configuration: python:mailman.config.exim4/g" /etc/mailman.cfg

# Install mailman-core
RUN python3 setup.py install

# Connect exim to mailman
COPY assets/exim/25_mm3_macros .
RUN cat 25_mm3_macros >> /etc/exim4/conf.d/main/25_mm3_macros
RUN sed -i -e "s/list.example.net/${MAILMAN_DOMAIN}/g" /etc/exim4/conf.d/main/25_mm3_macros
COPY assets/exim/55_mm3_transport .
RUN cat 55_mm3_transport >> /etc/exim4/conf.d/transport/55_mm3_transport
COPY assets/exim/455_mm3_router .
RUN cat 455_mm3_router >> /etc/exim4/conf.d/router/455_mm3_router

# Restart exim
RUN service exim4 restart

# Add custom templates
COPY assets/mailman-core/templates /var/tmp/mailman

# Create a volume for mailman's data
VOLUME /var/tmp/mailman/data

# Setup locale
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

### END mailman-core ###



### START mailman-core-hyperkitty-plugin ###

# Setup mailman-core-hyperkitty-plugin environment and get sources
WORKDIR /opt
RUN git clone https://gitlab.com/mailman/mailman-hyperkitty.git
RUN mv mailman-hyperkitty mailman-core-hyperkitty-plugin
WORKDIR mailman-core-hyperkitty-plugin

# Install mailman-core-hyperkitty-plugin
RUN python3 setup.py install

# Add mailman-core-hyperkitty-plugin config
COPY assets/mailman-core-hyperkitty-plugin/mailman-core-hyperkitty-plugin.cfg .
RUN cat mailman-core-hyperkitty-plugin.cfg >> /etc/mailman-core-hyperkitty-plugin.cfg

# Configure mailman-core-hyperkitty-plugin
ARG HYPERKITTY_API_KEY="asdfasdf474"
RUN sed -i -e "s/mailman-archiver-key/${HYPERKITTY_API_KEY}/g" /etc/mailman-core-hyperkitty-plugin.cfg

### END mailman-core-hyperkitty-plugin ###



### START hyperkitty ###

# Setup hyperkitty environment and get sources
WORKDIR /opt
RUN git clone https://gitlab.com/mailman/hyperkitty.git
WORKDIR hyperkitty

# Install dependencies
RUN apt install -y gcc sassc python3-dev python3-pip apache2 libapache2-mod-wsgi-py3
RUN pip3 install Whoosh

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

# Setup mailman-web environment
WORKDIR /opt
RUN mkdir mailman-web
WORKDIR /opt/mailman-web

# Add mailman-web config
COPY assets/mailman-web/settings.py .
COPY assets/mailman-web/urls.py .
COPY assets/mailman-web/wsgi.py .
COPY assets/mailman-web/apache.conf .

# Configure mailman-web
ARG HYPERKITTY_ADMIN_USERNAME="Felicitas Pojtinger"
ARG HYPERKITY_ADMIN_EMAIL="felicitas@pojtinger.com"
RUN sed -i -e "s/mailman-web-secret-key/${HYPERKITTY_API_KEY}/g" settings.py
RUN sed -i -e "s/Mailman Web Admin/${HYPERKITTY_ADMIN_USERNAME}/g" settings.py
RUN sed -i -e "s/root@localhost/${HYPERKITY_ADMIN_EMAIL}/g" settings.py
RUN sed -i -e "s/forum.libresat.space/${MAILMAN_DOMAIN}/g" settings.py
RUN sed -i -e "s/mailman-rest-admin/${MAILMAN_ADMIN_USERNAME}/g" settings.py
RUN sed -i -e "s/mailman-rest-pass/${MAILMAN_ADMIN_PASSWORD}/g" settings.py
RUN sed -i -e "s/mailman-archiver-key/${HYPERKITTY_API_KEY}/g" settings.py
RUN sed -i -e "s/localhost.local/${MAILMAN_DOMAIN}/g" settings.py
RUN sed -i -e "s%http://localhost:8000%${MAILMAN_DOMAIN}%g" settings.py
RUN sed -i -e "s/mail.gandi.net/${EXTERNAL_SMTP_DOMAIN}/g" settings.py
RUN sed -i -e "s/noreply@libresat.space/${EXTERNAL_SMTP_USERNAME}/g" settings.py
RUN sed -i -e "s/249j89aSf8234ns@#234/${EXTERNAL_SMTP_PASSWORD}/g" settings.py
RUN echo 'Include "/opt/mailman-web/apache.conf"' >> /etc/apache2/apache2.conf

# Setup mailman-web
RUN django-admin migrate --pythonpath . --settings settings
RUN django-admin collectstatic --pythonpath . --settings settings
RUN django-admin compress --pythonpath . --settings settings

# Add volume for mailman-web's data
VOLUME /opt/mailman-web 

# Restart apache
RUN mkdir /var/log/httpd/
RUN a2enmod wsgi
RUN service apache2 restart

### END mailman-web ###



### START startup ###

# Start mailman (TODO: This is dangerous and stupid so _fix_ permissions instead of establishing anarchy)
CMD service exim4 restart && mailman start && service apache2 restart && chmod 777 -R /opt/mailman-web && tail -f /var/tmp/mailman/logs/mailman.log

# Expose exim, mailman-core REST API (DO. NOT. MAKE. THIS. PUBLIC. Use an internal network instead.) and hyperkitty
EXPOSE 25 80 8001 8024

### END startup ###