<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backbone.js Contact Manager</title>

    <!-- grails specific tags -->
    <r:require module="contact" />
    <meta name="layout" content="main">
  </head>
  <body>
    <header></header>
    <div class="container">
      <g:include controller="book"/>
    </div>
    <footer></footer>
    <script type="text/template" id="book-details-template">
      <div class="book">
        <span class="title">{{title}}</span>,
        <span class="author">{{author}}<span>
        <a class="less" href="../">less</a>
      </div>
    </script>
  </body>
</html>
