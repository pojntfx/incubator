<button class="item button--download">
  <i class="download icon"></i>
  Download $wikititle$
</button>

<div class="ui modal modal--download">
  <i class="close icon"></i>
  <div class="header">
    Download $wikititle$
  </div>
  <div class="scrolling content">
    <div class="description">
      <section id="data" class="segment">
        <h2>Data</h2>
        <p>This wiki's data backend is based on the free/libre open source distributed version control system
          <a href="https://git-scm.com/">Git</a>. This gives you the freedom to download (and host) your own copy/mirror of this wiki. In order to download
          the data however, you don't actually need to have Git - you may just download a zip file instead. Using Git however
          gives you cool abilities such as downloading latest changes from this repo or proposing changes without using the
          wiki's web interface.</p>
        <div class="ui two stackable cards cards--download">
          <a class="ui card" href="$httpsgitlink()$">
            <div class="content">
              <h2 class="ui icon header">
                <i class="git icon"></i>
                <div class="content">
                  Git
                  <div class="sub header">Enables updates and tracking of your changes, but requires installing the
                    <code>git</code> package</div>
                </div>
              </h2>
            </div>
          </a>
          <a class="ui card" href="$ziplink()$">
            <div class="content">
              <h2 class="ui icon header">
                <i class="file archive icon"></i>
                <div class="content">
                  .zip
                  <div class="sub header">Does not require installing the
                    <code>git</code> package, but does not enable updates or tracking of your changes</div>
                </div>
              </h2>
            </div>
          </a>
        </div>
        <p>If you want to use git, use the following commands to clone the repository:</p>

        <h3>Install Git</h3>
        <p>First, you'll have to install the
          <code>git</code> package:</p>
        <div class="ui top attached tabular stackable menu">
          <a class="item active tabs--install-git__item" data-tab="first--installing-git">Fedora GNU/Linux</a>
          <a class="item tabs--install-git__item" data-tab="second--installing-git">Debian/Ubuntu GNU/Linux</a>
          <a class="item tabs--install-git__item" data-tab="third--installing-git">Arch GNU/Linux</a>
        </div>
        <div class="ui bottom attached tab segment active" data-tab="first--installing-git">
          <div class="ui labeled fluid input">
            <div class="ui label">
              \$
            </div>
            <input type="text" value="sudo dnf install git" readonly>
          </div>
        </div>
        <div class="ui bottom attached tab segment" data-tab="second--installing-git">
          <div class="ui labeled fluid input">
            <div class="ui label">
              \$
            </div>
            <input type="text" value="sudo apt install git" readonly>
          </div>
        </div>
        <div class="ui bottom attached tab segment" data-tab="third--installing-git">
          <div class="ui labeled fluid input">
            <div class="ui label">
              \$
            </div>
            <input type="text" value="sudo pacman -Syu git" readonly>
          </div>
        </div>
        <h3>Setup Git</h3>
        <p>Afterwards, tell git who you are:</p>
        <pre>\$ git config --global user.name  "John Doe"
\$ git config --global user.email "johndoe@example.com"</pre>
        <h3>Clone the repository</h3>
        <p>Now you can clone the repository using either HTTPS (does not require setup of SSH) or SSH (which enables, among
          other things, public key authentication with)</p>
        <div class="ui top attached tabular stackable menu">
          <a class="item active tabs--setup-git__item" data-tab="first--setup-git">HTTPS</a>
          <a class="item tabs--setup-git__item" data-tab="second--setup-git">SSH</a>
        </div>
        <div class="ui bottom attached tab segment active" data-tab="first--setup-git">
          <div class="ui labeled fluid input">
            <div class="ui label">
              \$
            </div>
            <input type="text" value="git clone $httpsgitlink()$" readonly>
          </div>
        </div>
        <div class="ui bottom attached tab segment" data-tab="second--setup-git">
          <div class="ui labeled fluid input">
            <div class="ui label">
              \$
            </div>
            <input type="text" value="git clone $sshgitlink()$" readonly>
          </div>
        </div>
        <p>Now, all of your files are stored in the local repository! To update, just run
          <code>git pull</code> from inside the repository and you'll have the latest changes.</p>
        <p>Consider checking out the
          <a href="https://docs.gitlab.com/ee/user/project/merge_requests/">GitLab documentation on merge requests</a> for information on how you can submit changes without using the wiki's
          web interface.</p>
    </div>
    </section>
    <section id="source-code" class="segment segment--source-code">
      <h2>Source Code</h2>
      <pre>Gitit Docker
Copyright (C) 2018 Felicitas Pojtinger

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
</pre>
      <p>
        This wiki is based on the free/libre open source software
        <a href="https://github.com/jgm/gitit">Gitit</a>. This software is licensed using the
        <a href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html">GNU General Public License, version 2</a>. The custom interface that is being used on this wiki is free/libre open
        source software (it is licensed under the
        <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">GNU Affero General Public License, version 3</a> ) and it's source code is available on
        <a href="https://gitlab.com/pojntfx/incubator/tree/master/packages/gitit-docker">Gitlab</a>.</p>
      <p>In addition to the source, there are also instructions on how to setup and deploy the wiki using the free/libre open
        source software
        <a href="https://www.docker.com/">Docker</a> as well as
        <a href="https://kubernetes.io/">Kubernetes</a>.
      </p>
    </section>
  </div>
</div>

<script>
  jQuery(document).ready(() => {
    jQuery(".tabs--install-git__item").tab();
    jQuery(".tabs--setup-git__item").tab();
    jQuery(".modal--download").modal("attach events", ".button--download", "show");
  })
</script>

<style>
  .button--download {
    cursor: pointer;
  }

  .cards--download {
    margin-top: 1em !important;
    margin-bottom: 1em !important;
  }

  .segment--source-code {
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>