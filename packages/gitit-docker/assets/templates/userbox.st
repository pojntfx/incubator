<noscript>
  <a href="$base$/_login">Login</a>
  <a href="$base$/_logout">Logout</a>
</noscript>
<!-- Weird markup here is necessary for the inserted scripts to work -->
<div style="display:none" class="item">
  <div>
    <a id="loginlink" href="$base$/_login" class="item">
      <i class="sign in icon"></i>
      Log in
    </a>
  </div>
</div>
<div style="display:none" class="item">
  <div>
    <a id="logoutlink" href="$base$/_logout" class="item">
      <i class="sign out icon"></i>
      Logout &nbsp;
      <span id="logged_in_user"></span>
    </a>
  </div>
</div>