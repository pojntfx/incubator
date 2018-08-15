FROM debian:stretch
LABEL maintainer="Felix Pojtinger <felix@pojtinger.com> @pojntfx"

# Update the system
RUN apt update
RUN apt upgrade -y



### START postfix ###

# Setup mailname
ARG POSTFIX_DOMAIN="mail.libresat.space"
RUN echo ${POSTFIX_DOMAIN} > /etc/mailname

# Setup debconf
ARG EXTERNAL_SMTP_DOMAIN="mail.gandi.net"
ENV DEBIAN_FRONTEND="noninteractive"
RUN bash -c "debconf-set-selections <<< \"postfix postfix/recipient_delim string +\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/procmail boolean false\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/chattr boolean false\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/root_address string root\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/destinations string ${POSTFIX_DOMAIN}, localhost\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/mailbox_limit string 0\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/rfc1035_violation boolean false\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/mailname string ${POSTFIX_DOMAIN}\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/main_mailer_type select Internet with smarthost\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/protocols select ipv4\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/relayhost string ${EXTERNAL_SMTP_DOMAIN}\""

# Install dependencies
RUN apt install -y postfix mailutils

# Add password and username for smarthost
ARG EXTERNAL_SMTP_USERNAME="test@libresat.space"
ARG EXTERNAL_SMTP_PASSWORD="345lkUDfg03jd~"
RUN echo "${EXTERNAL_SMTP_DOMAIN} ${EXTERNAL_SMTP_USERNAME}:${EXTERNAL_SMTP_PASSWORD}" >> /etc/postfix/relay_passwords
RUN postmap /etc/postfix/relay_passwords

# Configure postfix
COPY assets/postfix/main.cf .
RUN cat main.cf >> /etc/postfix/main.cf

# Restart postfix
RUN service postfix start

# Install dependencies
RUN apt install -y lynx git python3 python3-setuptools

### END postfix ###



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
ARG MAILMAN_ADMIN_EMAIL="felix@pojtinger.com"
ARG MAILMAN_ADMIN_USERNAME="pojntfx"
ARG MAILMAN_ADMIN_PASSWORD="asdfasdf123"
ARG MAILMAN_DEFAULT_LANGUAGE="en"
ARG MAILMAN_DOMAIN="mail.libresat.space"
# ARG MAILMAN_USE_HTTPS="no"
RUN sed -i -e "s/site_owner: changeme@example.com/site_owner: ${MAILMAN_ADMIN_EMAIL}/g" /etc/mailman.cfg
RUN sed -i -e "s/default_language: en/default_language: ${MAILMAN_DEFAULT_LANGUAGE}/g" /etc/mailman.cfg
# RUN sed -i -e "s/use_https: no/use_https: ${MAILMAN_USE_HTPPS}/g" /etc/mailman.cfg
RUN sed -i -e "s/admin_user: mailman-rest-admin/admin_user: ${MAILMAN_ADMIN_USERNAME}/g" /etc/mailman.cfg
RUN sed -i -e "/admin_pass/c\admin_pass: ${MAILMAN_ADMIN_PASSWORD}" /etc/mailman.cfg

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
RUN pip3 install Whoosh django-q==0.9.4

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
COPY assets/mailman-web/manage.py .
COPY assets/mailman-web/urls.py .
COPY assets/mailman-web/wsgi.py .
COPY assets/mailman-web/apache.conf .

# Configure mailman-web
ARG HYPERKITTY_ADMIN_USERNAME="Felix Pojtinger"
ARG HYPERKITY_ADMIN_EMAIL="felix@pojtinger.com"
RUN sed -i -e "s/mailman-web-secret-key/${HYPERKITTY_API_KEY}/g" settings.py
RUN sed -i -e "s/Mailman Web Admin/${HYPERKITTY_ADMIN_USERNAME}/g" settings.py
RUN sed -i -e "s/root@localhost/${HYPERKITY_ADMIN_EMAIL}/g" settings.py
RUN sed -i -e "s/forum.libresat.space/${MAILMAN_DOMAIN}/g" settings.py
RUN sed -i -e "s/mailman-rest-admin/${MAILMAN_ADMIN_USERNAME}/g" settings.py
RUN sed -i -e "s/mailman-rest-pass/${MAILMAN_ADMIN_PASSWORD}/g" settings.py
RUN sed -i -e "s/mailman-archiver-key/${HYPERKITTY_API_KEY}/g" settings.py
RUN sed -i -e "s/localhost.local/${POSTFIX_DOMAIN}/g" settings.py
RUN sed -i -e "s%http://localhost:8000%${MAILMAN_DOMAIN}%g" settings.py
RUN sed -i -e "s/mail.gandi.net/${EXTERNAL_SMTP_DOMAIN}/g" settings.py
RUN sed -i -e "s/test@libresat.space/${EXTERNAL_SMTP_USERNAME}/g" settings.py
RUN sed -i -e "s/345lkUDfg03jd/${EXTERNAL_SMTP_PASSWORD}/g" settings.py
RUN echo 'Include "/opt/mailman-web/apache.conf"' >> /etc/apache2/apache2.conf

# Setup mailman-web
RUN django-admin migrate --pythonpath . --settings settings
RUN django-admin collectstatic --pythonpath . --settings settings
RUN django-admin compress --pythonpath . --settings settings

# Create superuser
ARG DJANGO_ADMIN_EMAIL="goooglehupf007@gmail.com"
ARG DJANGO_ADMIN_USERNAME="pojntfx"
ARG DJANGO_ADMIN_PASSWORD="supersecurepassword"
RUN echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('${DJANGO_ADMIN_USERNAME}', '${DJANGO_ADMIN_EMAIL}', '${DJANGO_ADMIN_PASSWORD}')" | python3 manage.py shell

# Add volume for mailman-web's data
VOLUME /opt/mailman-web 

# Restart apache
RUN mkdir /var/log/httpd/
RUN a2enmod wsgi
RUN service apache2 restart

### END mailman-web ###



### START startup ###

# Start mailman (TODO: This is dangerous and stupid so _fix_ permissions instead of establishing anarchy)
CMD service postfix restart && mailman start && service apache2 restart && chmod 777 -R /opt/mailman-web && tail -f /var/tmp/mailman/logs/mailman.log

# Expose postfix, mailman-core REST API (DO. NOT. MAKE. THIS. PUBLIC. Use an internal network instead.) and hyperkitty
EXPOSE 25 80 8001 8024

### END startup ###