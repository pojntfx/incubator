$if(tabs)$
<div class="ui top attached tabular menu tabnav">
  $tabs$
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
    jQuery(".tabs").contents().unwrap()
    jQuery(".tabnav > li:not(.selected) > a").unwrap().addClass("item")
    jQuery(".tabnav > li.selected > a").unwrap().addClass("item active")
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
  .tabnav>.item {
    text-transform: capitalize !important;
  }

  .message--revision__input {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  code,
  pre {
    overflow-x: auto;
  }
</style>