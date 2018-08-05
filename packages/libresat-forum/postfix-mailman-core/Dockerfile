FROM debian:latest

# Update the system
RUN apt update
RUN apt upgrade -y

# Setup postfix by preseeding as satellite system
ARG LIST_DOMAIN="forum.libresat.space"
ARG EXTERNAL_SMTP_DOMAIN="mail.gandi.net"
RUN bash -c "debconf-set-selections <<< \"postfix postfix/main_mailer_type string 'Satellite System'\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/mailname string ${LIST_DOMAIN}\""
RUN bash -c "debconf-set-selections <<< \"postfix postfix/relayhost string ${EXTERNAL_SMTP_DOMAIN}\""

# Install dependencies
RUN apt install -y postfix libsasl2-2 mailutils

# Enable SASL
COPY assets/main.cf .
RUN cat main.cf >> /etc/postfix/main.cf
RUN cat /etc/postfix/main.cf

# Add SASL credentials
ARG EXTERNAL_SMTP_USERNAME="noreply@libresat.space"
ARG EXTERNAL_SMTP_PASSWORD="249j89aSf8234ns@#234"
RUN echo "${EXTERNAL_SMTP_DOMAIN} ${EXTERNAL_SMTP_USERNAME}:${EXTERNAL_SMTP_PASSWORD}" > /etc/postfix/sasl/sasl_passwd
RUN postmap /etc/postfix/sasl/sasl_passwd

# Secure SASL credentials by restricting read and write access
RUN chown -R root:postfix /etc/postfix/sasl
RUN chmod 750 /etc/postfix/sasl
RUN chmod 640 /etc/postfix/sasl/sasl_passwd*

# Start postfix
RUN service postfix start

# Test postfix
RUN mail -s "test message" goooglehupf007@gmail.com