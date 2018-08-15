#! /bin/bash

setup_postfix() {
	printf "\033[0;32mSetting up postfix ...\033[0m\n"
	# Setup mailname
	echo ${POSTFIX_DOMAIN} >/etc/mailname

	# Setup debconf
	bash -c "debconf-set-selections <<< \"postfix postfix/recipient_delim string +\""
	bash -c "debconf-set-selections <<< \"postfix postfix/procmail boolean false\""
	bash -c "debconf-set-selections <<< \"postfix postfix/chattr boolean false\""
	bash -c "debconf-set-selections <<< \"postfix postfix/root_address string root\""
	bash -c "debconf-set-selections <<< \"postfix postfix/destinations string ${POSTFIX_DOMAIN}, localhost\""
	bash -c "debconf-set-selections <<< \"postfix postfix/mailbox_limit string 0\""
	bash -c "debconf-set-selections <<< \"postfix postfix/rfc1035_violation boolean false\""
	bash -c "debconf-set-selections <<< \"postfix postfix/mailname string ${POSTFIX_DOMAIN}\""
	bash -c "debconf-set-selections <<< \"postfix postfix/main_mailer_type select Internet with smarthost\""
	bash -c "debconf-set-selections <<< \"postfix postfix/protocols select ipv4\""
	bash -c "debconf-set-selections <<< \"postfix postfix/relayhost string ${EXTERNAL_SMTP_DOMAIN}\""

	# Install postfix
	apt install -y postfix mailutils

	# Configure postfix
	echo "${EXTERNAL_SMTP_DOMAIN} ${EXTERNAL_SMTP_USERNAME}:${EXTERNAL_SMTP_PASSWORD}" >>/etc/postfix/relay_passwords
	cat /main.cf >>/etc/postfix/main.cf

	# Add password and username for smarthost
	postmap /etc/postfix/relay_passwords
}

setup_mailman_core() {
	printf "\033[0;32mSetting up mailman-core ...\033[0m\n"
	# MAILMAN_USE_HTTPS="no"
	sed -i -e "s/site_owner: changeme@example.com/site_owner: ${MAILMAN_ADMIN_EMAIL}/g" /etc/mailman.cfg
	sed -i -e "s/default_language: en/default_language: ${MAILMAN_DEFAULT_LANGUAGE}/g" /etc/mailman.cfg
	# sed -i -e "s/use_https: no/use_https: ${MAILMAN_USE_HTPPS}/g" /etc/mailman.cfg
	sed -i -e "s/admin_user: mailman-rest-admin/admin_user: ${MAILMAN_ADMIN_USERNAME}/g" /etc/mailman.cfg
	sed -i -e "/admin_pass/c\admin_pass: ${MAILMAN_ADMIN_PASSWORD}" /etc/mailman.cfg
}

setup_mailman_core_hyperkitty_plugin() {
	printf "\033[0;32mSetting up mailman-core-hyperkitty-plugin ...\033[0m\n"
	sed -i -e "s/mailman-archiver-key/${HYPERKITTY_API_KEY}/g" /etc/mailman-core-hyperkitty-plugin.cfg
}

setup_mailman_web() {
	printf "\033[0;32mSetting up mailman-web ...\033[0m\n"
	sed -i -e "s/mailman-web-secret-key/${HYPERKITTY_API_KEY}/g" /opt/mailman-web/settings.py
	sed -i -e "s/Mailman Web Admin/${HYPERKITTY_ADMIN_USERNAME}/g" /opt/mailman-web/settings.py
	sed -i -e "s/root@localhost/${HYPERKITY_ADMIN_EMAIL}/g" /opt/mailman-web/settings.py
	sed -i -e "s/forum.libresat.space/${MAILMAN_DOMAIN}/g" /opt/mailman-web/settings.py
	sed -i -e "s/mailman-rest-admin/${MAILMAN_ADMIN_USERNAME}/g" /opt/mailman-web/settings.py
	sed -i -e "s/mailman-rest-pass/${MAILMAN_ADMIN_PASSWORD}/g" /opt/mailman-web/settings.py
	sed -i -e "s/mailman-archiver-key/${HYPERKITTY_API_KEY}/g" /opt/mailman-web/settings.py
	sed -i -e "s/localhost.local/${POSTFIX_DOMAIN}/g" /opt/mailman-web/settings.py
	sed -i -e "s%http://localhost:8000%${MAILMAN_DOMAIN}%g" /opt/mailman-web/settings.py
	sed -i -e "s/mail.gandi.net/${EXTERNAL_SMTP_DOMAIN}/g" /opt/mailman-web/settings.py
	sed -i -e "s/test@libresat.space/${EXTERNAL_SMTP_USERNAME}/g" /opt/mailman-web/settings.py
	sed -i -e "s/345lkUDfg03jd/${EXTERNAL_SMTP_PASSWORD}/g" /opt/mailman-web/settings.py
	echo 'Include "/opt/mailman-web/apache.conf"' >>/etc/apache2/apache2.conf

	cd /opt/mailman-web && django-admin migrate --pythonpath . --settings settings
	cd /opt/mailman-web && django-admin collectstatic --pythonpath . --settings settings
	cd /opt/mailman-web && django-admin compress --pythonpath . --settings settings

	echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('${DJANGO_ADMIN_USERNAME}', '${DJANGO_ADMIN_EMAIL}', '${DJANGO_ADMIN_PASSWORD}')" | python3 /opt/mailman-web/manage.py shell
}

reload_and_start_services() {
	printf "\033[0;32mReloading and starting services, then listening to mailman's log (until forever) ...\033[0m\n"
	postfix start
	postfix reload
	postfix stop
	postfix start
	mailman start
	service apache2 restart
	chmod 777 -R /opt/mailman-web
	tail -f /var/tmp/mailman/logs/mailman.log
}

start() {
	setup_postfix
	setup_mailman_core
	setup_mailman_core_hyperkitty_plugin
	setup_mailman_web
	reload_and_start_services
}

start
