FROM debian:latest
LABEL maintainer="Felix Pojtinger <felix@pojtinger.com> @pojntfx"

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
ARG EXTERNAL_SMTP_USERNAME="noreply@libresat.space"
ARG EXTERNAL_SMTP_PASSWORD="249j89aSf8234ns@#234"
RUN echo "${EXTERNAL_SMTP_DOMAIN}:${EXTERNAL_SMTP_USERNAME}:${EXTERNAL_SMTP_PASSWORD}" >> /etc/exim4/passwd.client
RUN update-exim4.conf

# Restart exim
RUN service exim4 restart

# Install dependencies
RUN apt install -y lynx git python3 python3-setuptools

# Get mailman-core sources
RUN git clone https://gitlab.com/mailman/mailman.git
WORKDIR mailman

# Add mailman config
COPY assets/mailman.cfg .
RUN cat mailman.cfg >> /etc/mailman.cfg
ENV MAILMAN_CONFIG_FILE="/etc/mailman.cfg"

# Configure mailman
ARG MAILMAN_ADMIN_EMAIL="felix@pojtinger.com"
ARG MAILMAN_ADMIN_USERNAME="pojntfx"
ARG MAILMAN_ADMIN_PASSWORD="asdfasdf123"
ARG MAILMAN_DEFAULT_LANGUAGE="en"
ARG MAILMAN_DOMAIN="forum.libresat.space"
# ARG MAILMAN_USE_HTTPS="no"
RUN sed -i -e "s/site_owner: changeme@example.com/site_owner: ${MAILMAN_ADMIN_EMAIL}/g" /etc/mailman.cfg
RUN sed -i -e "s/default_language: en/default_language: ${MAILMAN_DEFAULT_LANGUAGE}/g" /etc/mailman.cfg
# RUN sed -i -e "s/use_https: no/use_https: ${MAILMAN_USE_HTPPS}/g" /etc/mailman.cfg
RUN sed -i -e "s/admin_user: restadmin/admin_user: ${MAILMAN_ADMIN_USERNAME}/g" /etc/mailman.cfg
RUN sed -i -e "/admin_pass/c\admin_pass: ${MAILMAN_ADMIN_PASSWORD}" /etc/mailman.cfg
RUN sed -i -e "s/incoming: mailman.mta.postfix.LMTP/#incoming: mailman.mta.postfix.LMTP/g" /etc/mailman.cfg
RUN sed -i -e "s/#incoming: mailman.mta.exim4.LMTP/incoming: mailman.mta.exim4.LMTP/g" /etc/mailman.cfg
# Probably lmtp_host: mail.libresat.space and smtp_host: mail.libresat.space, but let's try local first!
RUN sed -i -e "s/configuration: python:mailman.config.postfix/#configuration: python:mailman.config.postfix/g" /etc/mailman.cfg
RUN sed -i -e "s/#configuration: python:mailman.config.exim4/configuration: python:mailman.config.exim4/g" /etc/mailman.cfg

# Install mailman-core
RUN python3 setup.py install

# Connect exim to mailman
COPY assets/25_mm3_macros .
RUN cat 25_mm3_macros >> /etc/exim4/conf.d/main/25_mm3_macros
RUN sed -i -e "s/list.example.net/${MAILMAN_DOMAIN}/g" /etc/exim4/conf.d/main/25_mm3_macros
COPY assets/55_mm3_transport .
RUN cat 55_mm3_transport >> /etc/exim4/conf.d/transport/55_mm3_transport
COPY assets/455_mm3_router .
RUN cat 455_mm3_router >> /etc/exim4/conf.d/router/455_mm3_router

# Restart exim
RUN service exim4 restart

# Add custom templates
COPY assets/templates /var/tmp/mailman

# Create a volume for mailman's data
VOLUME /var/tmp/mailman/data

# Test mailman
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
RUN mailman info

# Add mailman-hyperkitty config
COPY assets/mailman-hyperkitty.cfg .
RUN cat mailman-hyperkitty.cfg >> /etc/mailman-hyperkitty.cfg

# Configure mailman-hyperkitty
ARG HYPERKITTY_API_KEY="asdfasdf474"
RUN sed -i -e "s/SecretArchiverAPIKey/${HYPERKITTY_API_KEY}/g" /etc/mailman-hyperkitty.cfg

# Get mailman-hyperkitty sources
RUN git clone https://gitlab.com/mailman/mailman-hyperkitty.git
WORKDIR mailman-hyperkitty

# Install mailman-hyperkitty
RUN python3 setup.py install

# Get hyperkitty sources
RUN git clone https://gitlab.com/mailman/hyperkitty.git
WORKDIR hyperkitty

# Install dependencies
RUN apt install -y gcc sassc python3-dev python3-pip apache2 libapache2-mod-wsgi-py3
RUN pip3 install Whoosh

# Install hyperkitty
RUN python3 setup.py install

# Configure hyperkitty django project
ARG HYPERKITTY_ADMIN_USERNAME="Felix Pojtinger"
ARG HYPERKITY_ADMIN_EMAIL="felix@pojtinger.com"
RUN sed -i -e "s/change-this-on-your-production-server/${HYPERKITTY_API_KEY}/g" example_project/settings.py
RUN sed -i -e "s/HyperKitty Admin/${HYPERKITTY_ADMIN_USERNAME}/g" example_project/settings.py
RUN sed -i -e "s/root@localhost/${HYPERKITY_ADMIN_EMAIL}/g" example_project/settings.py
RUN sed -i -e "s/lists.your-domain.org/${MAILMAN_DOMAIN}/g" example_project/settings.py
RUN sed -i -e "s/restadmin/${MAILMAN_ADMIN_USERNAME}/g" example_project/settings.py
RUN sed -i -e "s/restpass/${MAILMAN_ADMIN_PASSWORD}/g" example_project/settings.py
RUN sed -i -e "s/SecretArchiverAPIKey/${HYPERKITTY_API_KEY}/g" example_project/settings.py
# TODO: Use non-debug mode

# Set current location
RUN sed -i -e "s%/path/to/project%${PWD}/example_project%g" example_project/apache.conf
RUN sed -i -e "s%/path/to/project/static%${PWD}/example_project/static%g" example_project/apache.conf

# Use new syntax for permissiions
RUN sed -i -e "s/Order deny,allow/Require all granted/g" example_project/apache.conf
RUN sed -i -e "/Allow from all/d" example_project/apache.conf

# Add project's apache conf to main apache conf
RUN echo "Include \"${PWD}/example_project/apache.conf\"" >> /etc/apache2/apache2.conf
# TODO: Use actual FQDN for mailman
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Restart apache
RUN mkdir /var/log/httpd/
RUN a2enmod wsgi
RUN service apache2 restart

# Setup hyperkitty django project
RUN django-admin migrate --pythonpath example_project --settings settings
RUN django-admin collectstatic --pythonpath example_project --settings settings
RUN django-admin compress --force --pythonpath example_project --settings settings

# Add a volume for hyperkitty's data
VOLUME /mailman/mailman-hyperkitty/hyperkitty/example_project

# Set permission
# TODO: This is dangerous and stupid so fix permissions instead
RUN chmod 777 -R example_project/

# Start mailman
CMD service apache2 restart && service exim4 restart && mailman start && tail -f /var/tmp/mailman/logs/mailman.log

# Expose exim and mailman REST API (DO. NOT. MAKE. THIS. PUBLIC. Use an internal network instead.)
EXPOSE 25 8001 8024