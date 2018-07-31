<div class="ui segment">
  $if(revision)$
  <div class="ui icon message">
    <i class="history icon"></i>
    <div class="content">
      <div class="header">
        <span>Revision</span>
        <code>$revision$</code>
      </div>
      <a class="ui primary button" href="$base$$pageUrl$">Current Version</a>
    </div>
  </div> $endif$
  <h1>$pagetitle$</h1>
  $if(messages)$ $messages()$ $endif$ $content$
</div>