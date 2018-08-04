# Gitit Docker

A Docker container with Gitit, a Haskell-based wiki that uses Git as it's VCS. Also includes an SSH server so that you can clone the Git repo locally.

## Demo

> TODO: Add demo

## Usage

First, copy your public SSH key into `./assets/id_rsa.pub`. On UNIX-like systems (GNU/Linux or macOS), just run the following to do so:

```bash
# Reads your public SSH key and overwrites the contents of assets/id_rsa.pub with it
echo $(<~/.ssh/id_rsa.pub) > assets/id_rsa.pub
```

Now, you should setup the remote repo for the wiki's data:

1.  Create a new account for the merge bot on [GitLab](https://gitlab.com) or any other git host
2.  Create a repo on [GitLab](https://gitlab.com) or any other git host that you want to save the wiki's data in (and, if you didn't create the repo with the merge bot's account, add the merge bot as a member to the repo (on [GitLab](https://gitlab.com) that's on Repo > Settings > Members) and choose the "Maintainer" role permission). Also, this repo **MUST NOT BE EMPTY** or the build will fail. Add a license file (a `LICENSE.md`, for example, [CC-BY-4.0](https://choosealicense.com/licenses/cc-by-4.0/)) to it first and then continue.
3.  Open up the SSH keys settings page (on GitLab, that's [https://gitlab.com/profile/keys](https://gitlab.com/profile/keys)) of your new account and keep it open
4.  Adjust the environment variables in the following `docker run` command to fit your data

Also, you should consider putting the URLs for the remote git repo into the templates for your docker container so that the "Download Wiki" button will work. To do so, run the following (using your own data, of course):

```bash
echo "git@gitlab.com:pojntfx/git-wikidata-test.git" > assets/templates/sshgitlink.st
echo "https://gitlab.com/pojntfx/git-wikidata-test" > assets/templates/httpsgitlink.st
```

| Variable Name          | Example Value                                | Description                                                                                     |
| ---------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| GIT_BOT_EMAIL          | gitit-bot@libresat.space                     | Email to use for the merge bot                                                                  |
| GIT_BOT_NAME           | LibreSat Gitit Bot                           | Name to use for the merge bot                                                                   |
| GIT_REMOTE             | git@gitlab.com:pojntfx/git-wikidata-test.git | Remote git repo to store the data in (use SSH, not HTTPS)                                       |
| GIT_REMOTE             | git@gitlab.com:pojntfx/git-wikidata-test.git | Remote git repo to store the data in (use SSH, not HTTPS)                                       |
| EXTERNAL_SMTP_DOMAIN   | mail.gandi.net                               | SMTP server's domain to send "reset password" mails to with                                     |
| EXTERNAL_SMTP_USERNAME | noreply@libresat.space                       | Account name of the account on the SMTP server you want to send the "reset password" mails with |
| EXTERNAL_SMTP_PASSWORD | 249j8923490sdaSf8234ns                       | Password of the account on the SMTP server you want to send the "reset password" mails with     |

**IMPORTANT**: During the build process, the public SSH key of your merge bot will be logged. It will look something like this:

```bash
Step 19/40 : RUN echo "\033[0;31m>>> USER ACTION REQUIRED: CREATE A GITLAB/GITHUB USER, GRANT ACCESS TO WIKIDATA REPO, ADD FOLLOWING PUBLIC SSH KEY TO PROFILE <<<\033[0m"
 ---> Running in 4551ac4580ad
>>> USER ACTION REQUIRED: CREATE A GITLAB/GITHUB USER, GRANT ACCESS TO WIKIDATA REPO, ADD FOLLOWING PUBLIC SSH KEY TO PROFILE <<<
 ---> eabc594e8d36
Removing intermediate container 4551ac4580ad
Step 20/40 : RUN cat ~/.ssh/id_rsa.pub
 ---> Running in 740e9fc10384
# THIS IS THE START OF THE SSH KEY
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDKIXi4sTx2LrkYhK2I/35kENDsD5bh6d12ycOVHsVR/LQn0hjitG6j7O/6VTvWqy/Q8sGWcHGJb9oEkuLfMZOsHTOiWQP+Y0m+L1goNGgom+GeQOZ1lciRZjm+p4VEZMH169nJmwrqb8eymFJGj7AYiW9rHM (...) qTFCsk55Yn59LOxPau/CCrA9jo14vHPDhgNbQFBl2QZHsGsGXHauwKTpdowac970HLDtR2nuSSPGr root@f639faccb8ce
# THIS IS THE END OF THE SSH KEY
```

In order to allow the merge bot to commit to the repo, you'll have to add that SSH key to your merge bot's account. To do so, open up the SSH keys settings page (on GitLab, that's [https://gitlab.com/profile/keys](https://gitlab.com/profile/keys)) of the merge bot (the one you've opened up earlier), copy-and-paste in the SSH key and hit "Add key". You will only have to do this once during the build process, not for every docker container you launch in the future.

This means that the following is the normal build process:

```bash
# Install dependencies
npm install
# Compile CSS and JS
npm run build-semantic
# Build the container (don't forget to copy the SSH key as described above)
docker build . -t gitit-with-ssh
# Create the volume to store the user data in
docker volume create gitit-with-ssh
# Run the container (replace variables with your own ones)
docker run -d \
  -p 5001:5001 \
  -p 22:22 \
  -e GIT_BOT_NAME="LibreSat Gitit Bot" \
  -e GIT_BOT_EMAIL="gitit-bot@libresat.space" \
  -e GIT_REMOTE="git@gitlab.com:pojntfx/git-wikidata-test.git" \
  -e EXTERNAL_SMTP_DOMAIN="mail.gandi.net" \
  -e EXTERNAL_SMTP_USERNAME="noreply@libresat.space" \
  -e EXTERNAL_SMTP_PASSWORD="249j89aSf8234ns@#234" \
  -v gitit-with-ssh:/gitit/userdata \
  gitit-with-ssh
# Test if the container works
# Test web interface
curl localhost:5001
# Test access to internal git repo
git clone ssh://git@localhost:/gitit/wikidata
```

## Screenshots

> TODO: Add screenshots

## Documentation

> TODO: Add docs

## Deployment

> TODO: Add deployment

## License

Gitit Docker
Copyright (C) 2018 Felicitas Pojtinger

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
