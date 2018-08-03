<div class="ui segment navbar">
  <div class="ui secondary menu secondary-nav">
    <a class="item" href="$base$/">
      <b>$wikititle$</b>
    </a>
    <a class="item" href="$base$/">
      <i class="home icon"></i>
      Front Page
    </a>
    <a class="item" href="$base$/_categories">
      <i class="tags icon"></i>
      Categories
    </a>
    <a class="item" href="$base$/_index">
      <i class="list icon"></i>
      All Pages
    </a>
    <a class="item" href="$base$/_activity">
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
            <a class="item" href="$base$/_random">
              <i class="shuffle icon"></i>
              Random page
            </a>
            $if(wikiupload)$
            <a class="item" href="$base$/_upload">
              <i class="upload icon"></i>
              Upload a file
            </a>
            $endif$ $if(feed)$
            <a class="disabled item" href="$base$/_feed/" type="application/atom+xml" rel="alternate" title="ATOM Feed">
              <i class="feed icon"></i>
              Atom feed
            </a>
            $endif$
            <a class="item" href="$base$/Help">
              <i class="help icon"></i>
              Help
            </a>
            <div class="item">
              <form class="ui form" action="$base$/_go" method="post" id="goform">
                <div class="field">
                  <label>Go to page</label>
                  <input placeholder="Go to page" type="text" name="gotopage">
                </div>
                <button class="ui button" type="submit" name="go">Go</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right menu">
      <a class="item disabled">
        <i class="download icon"></i>
        Download Wiki
      </a>
      $userbox()$
      <div class="item">
        <form action="$base$/_search" method="get">
          <div class="ui icon input">
            <input placeholder="Search $wikititle$" type="text" name="patterns">
            <i class="search link icon"></i>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .secondary-nav {
    overflow-x: auto;
  }

  .navbar {
    margin-top: 1em !important;
  }
</style>

<script>
  jQuery(document).ready(() =>
    jQuery(".secondary-nav__dropdown--more")
      .accordion()
  )
</script>