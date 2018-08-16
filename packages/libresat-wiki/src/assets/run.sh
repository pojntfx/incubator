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

start() {
	setup_ssh
	configure_git_bot
  get_wiki_data_repo
}

start
