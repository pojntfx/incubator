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
}

start() {
	setup_ssh
	configure_git_bot
	get_wiki_data_repo
	setup_pre_post_commit_hooks
	setup_userdata
  add_templates_and_config
}

start
