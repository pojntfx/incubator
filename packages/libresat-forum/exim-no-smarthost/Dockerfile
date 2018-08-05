FROM debian:latest
LABEL maintainer="Felicitas Pojtinger <felicitas@pojtinger.com> @pojntfx"

# Update the system
RUN apt update
RUN apt upgrade -y

# Setup mailname
ARG EXIM_DOMAIN="mail.libresat.space"
ARG EXTERNAL_SMTP_DOMAIN="mail.gandi.net"
RUN echo ${EXIM_DOMAIN} > /etc/mailname

# Setup debconf
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/use_split_config boolean false\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_other_hostnames string ${EXIM_DOMAIN}\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_minimaldns boolean false\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_local_interfaces string 127.0.0.1 ; ::1\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_relay_domains string ${EXTERNAL_SMTP_DOMAIN}\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/no_config boolean true\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_eximconfig_configtype select internet site; mail is sent and received directly using SMTP\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_postmaster string root\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/dc_localdelivery select mbox format in /var/mail/\""
RUN bash -c "debconf-set-selections <<< \"exim4-config exim4/mailname string ${EXIM_DOMAIN}\""

# Install dependencies
RUN apt install -y exim4 mailutils

# Start exim
RUN service exim4 start