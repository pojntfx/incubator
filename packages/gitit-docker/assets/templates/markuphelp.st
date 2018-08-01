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

</script>

<style>
  .button--formatting-help {
    margin-bottom: 1em !important;
  }
</style>