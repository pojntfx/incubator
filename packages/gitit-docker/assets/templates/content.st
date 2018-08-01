$if(tabs)$
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
$endif$
<div class="ui $if(tabs)$ bottom attached $endif$ segment">
  $if(revision)$
  <div class="ui icon message warning">
    <i class="history icon"></i>
    <div class="content">
      <div class="header">
        <span>This is an older version of this page!</span>
        <div class="ui labeled fluid mini input message--revision__input">
          <div class="ui label">
            \$ git checkout
          </div>
          <input type="text" value="$revision$" readonly>
        </div>
      </div>
      <a class="ui primary button" href="$base$$pageUrl$">Use current version instead</a>
    </div>
  </div> $endif$
  <h1>$pagetitle$</h1>
  $if(markuphelp)$ $markuphelp()$ $endif$ $if(messages)$ $messages()$ $endif$ $content$
</div>

<script>
  jQuery(document).ready(() => {
    jQuery(".tabs").contents().unwrap();
    jQuery(".tertiary-nav > li:not(.selected) > a").unwrap().addClass("item tertiary-nav__item");
    jQuery(".tertiary-nav > li.selected > a").unwrap().addClass("item tertiary-nav__item active");
    jQuery(".tertiary-nav__dropdown--more")
      .accordion();
    jQuery("select[name='format']").addClass("ui search selection dropdown tertiary-nav__export-dropdown");
    jQuery(".tertiary-nav__export-dropdown").dropdown();
    updatePreviewPane = () => {
      jQuery("#previewPane").hide();
      const url = location.pathname.replace(/_edit/g, "_preview/");
      jQuery.post(
        url,
        { "raw": jQuery("#editedText").val() },
        (data) => {
          jQuery('#previewPane').html(data);
          // Process any mathematics if we're using MathML
          if (typeof (convert) == 'function') { convert(); }
          // Process any mathematics if we're using jsMath
          if (typeof (jsMath) == 'object') { jsMath.ProcessBeforeShowing(); }
          // Process any mathematics if we're using MathJax
          if (typeof (window.MathJax) == 'object') {
            // http://docs.mathjax.org/en/latest/typeset.html
            const math = document.getElementById("MathExample");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);
          }
        },
        "html");
      jQuery('#previewPane').fadeIn(1000);
      jQuery('#editedText').focus();
    };
  })
</script>

<style>
  .tertiary-nav>.item {
    text-transform: capitalize !important;
  }

  .message--revision__input {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .tertiary-nav__dropdown--more__title {
    padding: 0 !important;
  }
</style>