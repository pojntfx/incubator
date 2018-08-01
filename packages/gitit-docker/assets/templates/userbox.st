<noscript>
  <a href="$base$/_login">Login</a>
  <a href="$base$/_logout">Logout</a>
</noscript>
<!-- Weird markup here is necessary for the inserted scripts to work -->
<a id="loginlink" href="$base$/_login" class="item" style="display: none;">
  <i class="sign in icon"></i>
  Log in
</a>
<a id="logoutlink" href="$base$/_logout" class="item" style="display:none">
  <i class="sign out icon"></i>
  Logout &nbsp;
  <span id="logged_in_user"></span>
</a>

<script>
  /* <![CDATA[ */
  jQuery.get("$base$/_user", {}, (username, status) => {
    if (username != "") {
      jQuery("#logoutlink").show();
      jQuery("#logged_in_user").text(username);
    } else {
      jQuery("#loginlink").show();
    };
  });
  /* ]]> */
</script>