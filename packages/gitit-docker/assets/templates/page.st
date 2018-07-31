<!doctype html>
<html lang="en">

<head>
  <!-- Meta info -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>$pagetitle$ | $wikititle$</title>
  <!-- Atom feed -->
  <link href="$base$/img/icon.png" rel="icon" />
  <link href="$base$/_feed/" type="application/atom+xml" rel="alternate" title="$wikititle$" />
  <link href="$base$/_feed$pageUrl$" type="application/atom+xml" rel="alternate" title="$pagetitle$ - $wikititle$" />
  <!-- Semantic CSS -->
  <link rel="stylesheet" href="$base$/semantic/dist/semantic.min.css">
  <!-- Semantic JS, JQuery and MathJax-->
  <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
    crossorigin="anonymous"></script>
  <script src="$base$/semantic/dist/semantic.min.js"></script>
  <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?..."></script>
</head>

<body>
  <div class="ui container">
    <!-- Header -->
    $navbar()$
    <!-- Content -->
    $content()$
    <!-- Footer -->
    $footer()$
  </div>
</body>

</html>