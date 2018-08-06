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

# Start mailman
CMD mailman start && tail -f /var/tmp/mailman/logs/mailman.log

# Expose REST API (DO. NOT. MAKE. THIS. PUBLIC. Use an internal network instead.)
EXPOSE 8001