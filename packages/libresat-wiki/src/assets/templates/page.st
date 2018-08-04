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
  <script>
    /*    
    @licstart  The following is the entire license notice for the 
    JavaScript code in this page.

    LibreSat Wiki
    Copyright (C) 2018 Felicitas Pojtinger

    This program is free software: you can redistribute it and/or modify 
    it under the terms of the GNU Affero General Public License as published 
    by the Free Software Foundation, either version 3 of the License, or 
    (at your option) any later version.

    This program is distributed in the hope that it will be useful, but 
    WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License 
    for more details.

    You should have received a copy of the GNU Affero General Public License along 
    with this program. If not, see <https://www.gnu.org/licenses/>.

    @licend  The above is the entire license notice
    for the JavaScript code in this page.
    */
  </script>
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
  <!-- Global Scripts -->
  <script>
    jQuery(document).ready(() => {
      jQuery("form").addClass("ui form");
      jQuery("fieldset").addClass("field field--borderless");
      jQuery("input[type='submit']").addClass("ui submit button form__button");
    })
  </script>
  <!-- Global Styles -->
  <style>
    .field--borderless {
      border: 0;
    }

    .form__button {
      margin-top: 1em !important;
    }

    code,
    pre {
      overflow-x: auto;
    }

    /* Fix unnecessary scrollbar */

    body {
      height: auto !important;
    }

    /* Bots will fill this in, but humans won't cause the don't see it */

    #full_name_1 {
      display: none;
    }
  </style>
</body>

</html>