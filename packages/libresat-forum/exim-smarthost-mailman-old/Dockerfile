FROM debian:latest
LABEL maintainer="Felix Pojtinger <felix@pojtinger.com> @pojntfx"

# Update the system
RUN apt update
RUN apt upgrade -y

# Setup mailname
ARG EXIM_DOMAIN="mail.libresat.space"
RUN echo ${EXIM_DOMAIN} > /etc/mailname
# Hostname has to be set to ${EXIM_DOMAIN} as well, but docker does this with -h flag (see "docker run" in README)

# Setup debconf for exim
ARG EXTERNAL_SMTP_DOMAIN="mail.gandi.net"
ENV DEBIAN_FRONTEND="noninteractive"
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/mailname string ${EXIM_DOMAIN}\""
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

# Enable stretch backports
RUN echo "deb http://ftp.debian.org/debian stretch-backports main" >> /etc/apt/sources.list
RUN apt update

# Setup debconf for mailman
ARG MAILMAN_ADMIN_PASSWORD="asdfasdf123"
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/password-confirm password ${MAILMAN_ADMIN_PASSWORD}\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/app-password-confirm password ${MAILMAN_ADMIN_PASSWORD}\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/internal/reconfiguring boolean false\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/config_hyperkitty boolean true\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/database-type select sqlite3\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/db/basepath string /var/lib/mailman3/data\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/dbconfig-install boolean true\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/db/dbname string mailman.db\""
RUN bash -c "debconf-set-selections <<< \"mailman3 mailman3/internal/skip-preseed boolean false\""

# Install dependencies
RUN apt install -y -t stretch-backports mailman3

# Configure mailman
ARG MAILMAN_ADMIN_EMAIL="felix@pojtinger.com"
ARG MAILMAN_ADMIN_USERNAME="pojntfx"
ARG MAILMAN_DEFAULT_LANGUAGE="en"
ARG MAILMAN_DOMAIN="forum.libresat.space"
# TODO: ARG MAILMAN_USE_HTTPS="yes"
RUN sed -i -e "s/site_owner: changeme@example.com/site_owner: ${MAILMAN_ADMIN_EMAIL}/g" /etc/mailman3/mailman.cfg
RUN sed -i -e "s/default_language: en/default_language: ${MAILMAN_DEFAULT_LANGUAGE}/g" /etc/mailman3/mailman.cfg
# RUN sed -i -e "s/use_https: no/use_https: ${MAILMAN_USE_HTPPS}/g" /etc/mailman3/mailman.cfg
RUN sed -i -e "s/admin_user: restadmin/admin_user: ${MAILMAN_ADMIN_USERNAME}/g" /etc/mailman3/mailman.cfg
RUN sed -i -e "/admin_pass/c\admin_pass: ${MAILMAN_ADMIN_PASSWORD}" /etc/mailman3/mailman.cfg
RUN sed -i -e "s/incoming: mailman.mta.postfix.LMTP/#incoming: mailman.mta.postfix.LMTP/g" /etc/mailman3/mailman.cfg
RUN sed -i -e "s/#incoming: mailman.mta.exim4.LMTP/incoming: mailman.mta.exim4.LMTP/g" /etc/mailman3/mailman.cfg
# Probably lmtp_host: mail.libresat.space and smtp_host: mail.libresat.space, but let's try local first!
RUN sed -i -e "s/configuration: python:mailman.config.postfix/#configuration: python:mailman.config.postfix/g" /etc/mailman3/mailman.cfg
RUN sed -i -e "s/#configuration: python:mailman.config.exim4/configuration: python:mailman.config.exim4/g" /etc/mailman3/mailman.cfg

# Setup debconf for mailman
# RUN bash -c "debconf-set-selections <<< \"mailman mailman/default_server_language select en\""
# RUN bash -c "debconf-set-selections <<< \"mailman mailman/queue_files_present select abort installation\""
# RUN bash -c "debconf-set-selections <<< \"mailman mailman/site_languages multiselect en\""

# Install dependencies
# RUN apt install -y mailman

# # Create `mailman` list
# ARG MAILMAN_ADMIN_EMAIL="felix@pojtinger.com"
# ARG MAILMAN_ADMIN_PASSWORD="asdfasdf123"
# ARG MAILMAN_DEFAULT_LANGUAGE="en"
# ARG MAILMAN_DOMAIN="forum.libresat.space"
# RUN newlist \
#   -l ${MAILMAN_DEFAULT_LANGUAGE} \
#   -u ${MAILMAN_DOMAIN} \
#   -e ${EXIM_DOMAIN} \
#   --automate \
#   --quiet \
#   mailman \
#   ${MAILMAN_ADMIN_EMAIL} \
#   ${MAILMAN_ADMIN_PASSWORD}}

# # Setup aliases
# COPY assets/aliases .
# RUN cat aliases >> /etc/aliases
# RUN newaliases

# # Configure exim4
# COPY assets/04_exim4-config_mailman .
# RUN sed -i -e "s/lists.example.com/${MAILMAN_DOMAIN}/g" 04_exim4-config_mailman
# RUN cat 04_exim4-config_mailman >> /etc/exim4/conf.d/main/04_exim4-config_mailman
# COPY assets/40_exim4-config_mailman .
# RUN cat 40_exim4-config_mailman >> /etc/exim4/conf.d/transport/40_exim4-config_mailman
# COPY assets/101_exim4-config_mailman .
# RUN cat 101_exim4-config_mailman >> /etc/exim4/conf.d/router/101_exim4-config_mailman

# # Restart exim and mailman
# RUN service exim4 restart
# RUN service mailman restart

# # Install dependencies
# RUN apt install -y fcgiwrap

# # Restart fcgiwrap
# RUN service fcgiwrap restart

# # Install nginx
# RUN apt install -y nginx

# # Add mailman nginx config
# COPY assets/nginx-mailman.conf .
# RUN cat nginx-mailman.conf >> /etc/nginx/conf.d/mailman.conf

# # Restart nginx
# RUN nginx -t
# RUN service nginx restart