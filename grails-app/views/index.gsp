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
  </body>
</html>
