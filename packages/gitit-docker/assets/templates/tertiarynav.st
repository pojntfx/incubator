<div class="ui top attached stackable tabular menu tertiary-nav">
  $tabs$
  <div class="item">
    <div class="ui accordion tertiary-nav__dropdown--more">
      <div class="title tertiary-nav__dropdown--more__title">
        More
        <i class="dropdown icon"></i>
      </div>
      <div class="content">
        <div class="vertical menu">
          <a class="item" href="$base$/_showraw$pageUrl$$if(revision)$?revision=$revision$$endif$">
            <i class="code icon"></i>
            Raw page source
          </a>
          <a class="item disabled" href="$base$$pageUrl$?printable$if(revision)$&amp;revision=$revision$$endif$">
            <i class="print icon"></i>
            Printable version
          </a>
          <a class="item" href="$base$/_delete$pageUrl$">
            <i class="trash icon"></i>
            Delete this page
          </a>
          $if(feed)$
          <a class="item" href="$base$/_feed$pageUrl$" type="application/atom+xml" rel="alternate" title="This page's ATOM Feed">
            <i class="feed icon"></i>
            Atom feed
          </a>
          $endif$
          <a class="item" href="$base$/Help">
            <i class="help icon"></i>
            Help
          </a>
          $exportbox$
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Capitalize the text of the tertiary nav */

  .tertiary-nav>.item {
    text-transform: capitalize !important;
  }

  /* Normalize the height of the tertiary nav */

  .tertiary-nav__dropdown--more__title {
    padding: 0 !important;
  }
</style>

<script>
  jQuery(document).ready(() => {
    // Add Semantic UI's styles to the nav
    jQuery(".tabs").contents().unwrap();
    jQuery(".tertiary-nav > li:not(.selected) > a").unwrap().addClass("item tertiary-nav__item");
    jQuery(".tertiary-nav > li.selected > a").unwrap().addClass("item tertiary-nav__item active");
    jQuery(".tertiary-nav__dropdown--more")
      .accordion();
    // Add search functionality to the export menu
    jQuery("select[name='format']").addClass("ui search selection dropdown tertiary-nav__export-dropdown");
    jQuery(".tertiary-nav__export-dropdown").dropdown();
  })
</script>