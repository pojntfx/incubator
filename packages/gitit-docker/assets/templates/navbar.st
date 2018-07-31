<div class="ui segment">
  <div class="ui secondary menu secondary-nav">
    <a class="item" href="$base$/">
      <b>$wikititle$</b>
    </a>
    <a class="active item">
      <i class="home icon"></i>
      Front Page
    </a>
    <a class="item">
      <i class="tags icon"></i>
      Categories
    </a>
    <a class="item">
      <i class="list icon"></i>
      All Pages
    </a>
    <a class="item">
      <i class="chart line icon"></i>
      Recent Activity
    </a>
    <div class="item">
      <div class="ui accordion secondary-nav__dropdown--more">
        <div class="title">
          More
          <i class="dropdown icon"></i>
        </div>
        <div class="content">
          <div class="vertical menu">
            <a class="item">
              <i class="help icon"></i>
              Help
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="right menu">
      <a class="item">
        <i class="download icon"></i>
        Download Wiki
      </a>
      <div class="item">
        <div class="ui accordion secondary-nav__dropdown--more">
          <div class="title">
            <i class="user icon"></i>
            pojntfx
            <i class="dropdown icon"></i>
          </div>
          <div class="content">
            <div class="vertical menu">
              <a class="item">
                <i class="sign out icon"></i>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="ui icon input">
          <input type="text" placeholder="Search Wiki">
          <i class="search link icon"></i>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .secondary-nav {
    overflow-x: auto;
  }
</style>

<script>
  jQuery(document).ready(() =>
    jQuery(".secondary-nav__dropdown--more")
      .accordion()
  )
</script>