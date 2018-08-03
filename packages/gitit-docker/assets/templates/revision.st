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
</div>

<style>
  /* Add margin to the revision's SHA */

  .message--revision__input {
    margin-top: 1em;
    margin-bottom: 1em;
  }
</style>