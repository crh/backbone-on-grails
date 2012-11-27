<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Backbone.js Contact Manager</title>

    <!-- grails specific tags -->
    <r:require module="contact" />
    <meta name="layout" content="main">
    <!--
    <style>
      .contact-container {
        width:400px;
        padding:10px;
        border:1px solid #aaa;
        margin:0 10px 10px 0;
        float:left; font-family:sans-serif;
        color:#333; background-color:#eee;
      }

      .contact-container h1 {
        margin:0;
        font-weight:normal;
      }

      .contact-container h1 span {
        float:right;
        font-size:14px;
        line-height:24px;
        font-weight:normal;
      }

      .contact-container img {
        border-width:1px;
        border-style:solid;
        border-color:#fff;
        border-right-color:#aaa;
        border-bottom-color:#aaa;
        margin-right:10px;
        float:left;
      }

      .contact-container div {
        margin-bottom:24px;
        font-size:14px;
      }

      .contact-container a { color:#333; }

      .contact-container dl {
        margin:0;
        float:left;
        font-size:14px;
      }

      .contact-container dt,
      .contact-container dd {
        margin:0;
        float:left;
      }

      .contact-container dt {
        width:50px;
        clear:left;
      }
      .contact-container button {
        margin-top:10px;
        float:right;
      }

      header { margin-bottom:10px; }

      img { max-width: 100%; }

      header:after {
        content:"";
        display:block;
        height:0;
        visibility:hidden;
        clear:both;
        font-size:0;
        line-height:0;
      }

      #filter { float:left; }
      #showForm { float:right; }

      #addContact {
        display: none;
        float: right;
        clear: both;
        font-family: sans-serif;
        font-size: 14px;
      }

      #addContact label {
        width:60px;
        margin-right:10px;
        text-align:right;
        line-height:25px;
      }

      #addContact label,
      #addContact input {
        display:block;
        margin-bottom:10px;
        float:left;
      }

      #address {
        width:380px;
        margin-left:2px;
      }

      #addContact label[for="name"],
      #addContact label[for="address"],
      #addContact label[for="tel"] {
        clear:both;
      }

      #addContact button {
        display:block;
        margin:10px 10px 0 0;
        float:right;
        clear:both;
      }
    </style>
  -->
  </head>
  <body>
    <div id="contacts">
      <header>

        <div id="filter"><label>Show Me</label></div>

        <a id='showForm' href="#">Add new contact</a>

        <form id="addContact" action="#">
          <fieldset>

            <label for="photo">photo:</label>
            <input id="photo" type="file">

            <label for="type">Type:</label>
            <input id="type">

            <label for="name">Name:</label>
            <input id="name">

            <label for="address">Address:</label>
            <input id="address">

            <label for="tel">Tel:</label>
            <input id="tel">

            <label for="email">Email:</label>
            <input id="email">

            <button id="add" type="submit">Add</button>
          </fieldset>
        </form>

      </header>
    </div>
    <script type="text/template" id="contactTemplate">
      <img scr="{{ photo }}" alt="{{ name }}"/>
      <h1>{{ name }}<span>{{ type }}</span></h1>
      <div>{{ address }}</div>
      <dl>
        <dt>Tel:
        <dd>{{ tel }}
        <dt>Email:
        <dd><a href="mailto:{{ email }}">{{ email }}</a>
      </dl>
      <button id='delete'>Delete</button>
      <button class='edit'>Edit</button>
    </script>
    <script type="text/template" id="contactEditTemplate">
      <form action="#">
        <fieldset>
          <input type="file" value="{{ photo }}" />
          <input class="name" value="{{ name }}" />
          <input type="hidden" id="type" value="{{ type }}" />
          <input class="address" value="{{ address }}" />
          <input class="tel" value="{{ tel }}" />
          <input class="email" value="{{ email }}" />

          <button class="save">Save</button>
          <button class="cancel">Cancel</button>
        </fieldset>
      </form>
    </script>

    <div class="footer" role="contentinfo"></div>

    <!-- The Grails Resources Plug-in handle this -->
    <!--
    <script src="js/vendor/jquery-1.7.1.js"></script>
    <script src="js/vendor/underscore.js"></script>
    <script src="js/vendor/backbone.js"></script>
    <script src="js/app.js"></script>
    -->
  </body>
</html>
