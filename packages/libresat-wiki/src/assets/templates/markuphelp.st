<button class="ui button button--formatting-help">
  <i class="heading icon"></i>
  Formatting Help
</button>

<button class="ui button button--preview" onclick="updatePreviewPane();">
  <i class="eye icon"></i>
  Preview
</button>

<div class="ui modal modal--formatting-help">
  <i class="close icon"></i>
  <div class="header">
    Formatting
  </div>
  <div class="scrolling content">
    <div class="description">
      $markuphelp$
    </div>
  </div>
</div>

<div class="ui modal modal--preview">
  <i class="close icon"></i>
  <div class="header">
    Preview
  </div>
  <div class="scrolling content">
    <div class="description">
      <span id="previewPane"></span>
    </div>
  </div>
</div>

<script>
  jQuery(".modal--formatting-help").modal("attach events", ".button--formatting-help", "show")
  jQuery(".modal--preview").modal("attach events", ".button--preview", "show")
  // Add code from content.st here!
</script>

<style>
  .button--formatting-help {
    margin-bottom: 1em !important;
  }
</style>

<script>
  jQuery(document).ready(() => {
    // Add preview functionality to edit view
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