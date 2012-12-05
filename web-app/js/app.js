/* global $:false, jQuery:false */
(function($) {
  'use strict';
  console.log('start backbone web app');

  window.tpl = {
    // Hash of preloaded templates for the app
    templates: {},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment:
    // All the template files should be concatenated in a single file.
    loadTemplates: function(names, callback) {

      var that = this;

      var loadTemplate = function(index) {
          var name = names[index];
          console.log('Loading template: ' + name);
          $.get('templates/' + name + '.mustache', function(data) {
              that.templates[name] = data;
              index++;
              if (index < names.length) {
                  loadTemplate(index);
              } else {
                  callback();
              }
          });
      };

      loadTemplate(0);
    },

    // Get template by name from hash of preloaded templates
    get: function(name) {
      console.log('get template: ' + name)
      return this.templates[name];
    }
  };

  // le Model
  var Book = Backbone.Model.extend({
    defaults: {
      title: 'no title',
      author: 'no author'
    },
    initialize: function() {
      console.log('create a book: ' + JSON.stringify(this));
    }
  });

  // le View
  var BookView = Backbone.View.extend({

      el: $('.book'),

      events: {
        'click a.details': 'details',
        'click button.details': 'details'
      },

      initialize: function() {
        console.log('model: ', this.model);
        console.log('create the book view: ', this);
      },

      details: function(e) {
        e.preventDefault();

        console.log('show details: ', e);

        $('.container').empty();

        var template =  window.tpl.get('bookDetails');
        var html = Mustache.to_html(template, this.model.toJSON());
        $('.container').html(html);

        window.appRouter.navigate('details');
      },

      render: function() {
        $('.container').append('You are seeing this, because your web browser supports JavaScript.');
        return this;
      }

    });

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'details': 'details'
    },

    home: function() {
      window.ninjaBook = new Book({'title': 'Secrets of JavaScript Ninja', 'author': 'J. Ressig'});
      window.bookView = new BookView({model: ninjaBook});
      window.bookView.render();
    },

    details: function() {
      //TODO: render the details view.
    }
  });

  /*
  preload a template with the name book stored in
  `scripts/templates/book.html`
  */
  window.tpl.loadTemplates(['book', 'bookDetails'], function() {
    window.appRouter = new AppRouter();
    Backbone.history.start({pushState: true});
  });
}(jQuery));
