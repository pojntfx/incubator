#! /bin/bash

function install_dependencies() {
  echo "Installing dependencies ..."
  sudo dnf install python-setuptools python-devel python-virtualenv python3-devel git gcc nodejs-less postfix sassc
}

function create_sources_dir() {
  echo "Creating directory to store the sources in ..."
  cd ~/Clones
  mkdir mailman
  cd mailman
}

function get_sources() {
  echo "Getting sources"
  git clone git@gitlab.com:mailman/mailman.git && git clone git@gitlab.com:mailman/mailmanclient.git && git clone git@gitlab.com:mailman/django-mailman3.git && git clone git@gitlab.com:mailman/postorius.git && git clone git@gitlab.com:mailman/hyperkitty.git && git clone git@gitlab.com:mailman/mailman-hyperkitty.git
}

function create_virtualenvs() {
  echo "Creating Python 3.6 and 2.7 virtual environments ..."
  python3.6 -m venv venv-3.6
  virtualenv venv-2.7
}

function start_mailman() {
  echo "Starting Mailman ..."
  cd mailman # yes, a second time
  ../venv-3.6/bin/python setup.py develop
  ../venv-3.6/bin/mailman start
  cd ..
}

function start_mailmanclient() {
  echo "Starting Mailman Client ..."
  source venv-2.7/bin/activate
  cd mailmanclient
  python setup.py develop
  cd ..
}

function setup_postorius() {
  echo "Setting up Postorius ..."
  source venv-3.6/bin/activate
  cd postorius
  python3.6 setup.py develop
  cd example_project
  python3.6 manage.py migrate
  python3.6 manage.py createsuperuser
  cd ..
}

function setup_hyperkitty() {
  echo "Setting up Hyperkitty ..."
  source venv-3.6/bin/activate
  cd hyperkitty
  python3.6 setup.py develop
  cd ..
}

function start_postorius() {
  echo "Starting Postorius ..."
  source venv-3.6/bin/activate
  # Add a dummy email backend for email confirmation
  echo "EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'" >> postorius/example_project/settings.py
  cd postorius/example_project
  python3.6 manage.py runserver
  # Login with the account you created before
  # Verification link will be logged in the console, click on it (remove the "s" from "https")
  cd ../../
}

function start_hyperkitty() {
  echo "Starting Hyperkitty ..."
  source venv-3.6/bin/activate
  cd hyperkitty
  echo \
  "DEBUG = True
  TEMPLATE_DEBUG = DEBUG
  USE_SSL = False" > example_project/settings_local.py
  echo "EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'" >> example_project/settings.py
  pip3.6 install Whoosh # Search engine
  django-admin migrate --pythonpath example_project --settings settings
  django-admin runserver 8002 --pythonpath example_project  --settings settings
  # Sign up with a fresh account
  # Verification link will be logged in the console, click on it (remove the "s" from "https")
  cd ../
}

function start_mailman_hyperkitty() {
  echo "Starting Mailman-Hyperkitty ..."
  source venv-3.6/bin/activate
  cd mailman-hyperkitty
  ../venv-3.6/bin/python3.6 setup.py develop
  cd ../mailman
}

function connect_hyperkitty_to_mailman() {
  echo "Connecting Hyperkitty to Mailman ..."
  echo \
  "#mailman-hyperkitty.cfg
  [general]
  base_url: http://localhost:8002/
  api_key: SecretArchiverAPIKey" > mailman-hyperkitty.cfg
  echo \
  "#mailman.cfg
  [archiver.hyperkitty]
  class: mailman_hyperkitty.Archiver
  enable: yes
  configuration: ${PWD}/mailman-hyperkitty.cfg" >> var/etc/mailman.cfg

  ../venv-3.6/bin/mailman stop
  ../venv-3.6/bin/mailman start
}

# install_dependencies
# create_sources_dir
# get_sources
# create_virtualenvs
# start_mailman
# start_mailmanclient
# setup_postorius
# setup_hyperkitty
# start_postorius
# start_hyperkitty
# start_mailman_hyperkitty
# connect_hyperkitty_to_mailman