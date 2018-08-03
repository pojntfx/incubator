$if(tabs)$ $tertiarynav()$ $endif$
<div class="ui $if(tabs)$ bottom attached $endif$ segment">
  $if(revision)$ $revision()$ $endif$
  <h1>$pagetitle$</h1>
  $if(markuphelp)$ $markuphelp()$ $endif$ $if(messages)$ $messages()$ $endif$ $content$
</div>