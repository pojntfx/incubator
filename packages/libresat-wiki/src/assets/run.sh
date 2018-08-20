setup_ssh() {
	echo "Setting up SSH ..."
	sed -i -e "s/#PubkeyAuth/PubkeyAuth/g" /etc/ssh/sshd_config
	mkdir -p ~/.ssh/authorized_keys
	cp /opt/assets/id_rsa_container ~/.ssh/id_rsa
	cp /opt/assets/id_rsa_container.pub ~/.ssh/id_rsa.pub
	cp /opt/assets/id_rsa_repo_access.pub ~/.ssh/authorized_keys
	chmod 600 ~/.ssh/authorized_keys
}

configure_git_bot() {
	echo "Configuring git bot ..."
	git config --global user.email ${GIT_BOT_EMAIL}
	git config --global user.name "${GIT_BOT_NAME}"
}

get_wiki_data_repo() {
	echo "Cloning wiki data repository ..."
	ssh-keyscan -t rsa $(echo $GIT_REMOTE | cut -d"@" -f 2 | cut -d":" -f 1) >>~/.ssh/known_hosts
	git clone ${GIT_REMOTE}
	mv $(echo $GIT_REMOTE | cut -d"/" -f 2 | cut -d"." -f 1) wikidata
	cd wikidata && git checkout -b dev && cd ..
}

setup_pre_post_commit_hooks() {
	echo "Setting up pre- and post-commit hooks ..."
	cp /opt/assets/pre-commit ./wikidata/.git/hooks/pre-commit
	chmod +x ./wikidata/.git/hooks/pre-commit
	cp /opt/assets/post-commit ./wikidata/.git/hooks/post-commit
	chmod +x ./wikidata/.git/hooks/post-commit
}

setup_userdata() {
	echo "Setting up userdata ..."
	mkdir userdata
}

add_templates_and_config() {
	echo "Adding templates and config ..."
	cp /opt/assets/gitit.conf .
	cp -r /opt/assets/templates .
	cp -r /opt/assets/static .
}

configure_locale() {
	echo "Configuring locale ..."
	LC_ALL="C.UTF-8"
	LANG="en_US.UTF-8"
	LANGUAGE="en_US.UTF-8"
}

configure_sendmail() {
	echo "Configuring sendmail ..."
	echo "dnl define(\`SMART_HOST', \`${EXTERNAL_SMTP_DOMAIN}')" >>/etc/mail/sendmail.mc
	echo "AuthInfo:${EXTERNAL_SMTP_DOMAIN} \"U:${EXTERNAL_SMTP_USERNAME}\" \"P:${EXTERNAL_SMTP_PASSWORD}\" \"M:PLAIN\"" >>/etc/mail/authinfo
	makemap hash /etc/mail/authinfo </etc/mail/authinfo
	sed -i s/"MAILER_DEFINITIONS"/"FEATURE(\`authinfo')\nMAILER_DEFINITIONS"/g /etc/mail/sendmail.mc
	make -C /etc/mail
	sed -i s/START=no/START=yes/g /etc/default/saslauthd
}

setup_cron_jobs() {
	echo "Setting up cron jobs ..."
	echo "cd /opt/gitit/wikidata/ && git checkout master && git pull && git checkout dev && git merge master && cd /opt/gitit" >>pull_latest_changes.sh
	chmod +x pull_latest_changes.sh
	echo "* * * * * root cd /opt/gitit && ./pull_latest_changes.sh" >>/etc/cron.d/libresat-wiki
}

reload_and_start_services() {
	echo "Reloading and starting services ..."
	service cron restart &
	./pull_latest_changes.sh
	service saslauthd start
	service ssh start
	gitit -f gitit.conf &
	make -C /etc/mail
	service sendmail start
	tail -f gitit.conf
}

start() {
	setup_ssh
	configure_git_bot
	get_wiki_data_repo
	setup_pre_post_commit_hooks
	setup_userdata
	add_templates_and_config
	configure_locale
	configure_sendmail
	setup_cron_jobs
	reload_and_start_services
}

start
