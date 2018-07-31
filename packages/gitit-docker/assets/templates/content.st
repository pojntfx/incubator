<div class="ui top attached tabular menu tabnav">
  $tabs$
</div>
<div class="ui bottom attached segment">
  $if(revision)$
  <div class="ui icon message warning">
    <i class="history icon"></i>
    <div class="content">
      <div class="header">
        <span>Revision</span>
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

  $if(messages)$ $messages()$ $endif$ $content$
</div>

<script>
  jQuery(document).ready(() => {
    jQuery(".tabs").contents().unwrap()
    jQuery(".tabnav > li:not(.selected) > a").unwrap().addClass("item")
    jQuery(".tabnav > li.selected > a").unwrap().addClass("item active")
  }
  )
</script>

<style>
  .tabnav>.item {
    text-transform: capitalize !important;
  }
  .message--revision__input {
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>