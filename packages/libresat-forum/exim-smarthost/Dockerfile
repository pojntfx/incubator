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
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/mailname  string mail.libresat.space\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_minimaldns boolean false\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_localdelivery select mbox format in /var/mail/\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/hide_mailname boolean false\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_postmaster string root\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_eximconfig_configtype select mail sent by smarthost; received via SMTP or fetchmail\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_smarthost string mail.gandi.net\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_other_hostnames string mail.libresat.space\""
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