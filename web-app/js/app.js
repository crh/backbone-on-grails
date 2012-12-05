/* global $:false, jQuery:false */

/*
 * part 2: + filter basesd on user input. + routing
 */

(function($) {
  console.log('init book app');
  
  /*
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g,
    evaluate : /\{!(.+?)!\}/g
  };
  */

  // le Model
  var Book = Backbone.Model.extend({
    defaults: {
      title: 'no title',
      author: 'no author'
    },
    initialize: function() {
      console.log('init model ' + JSON.stringify(this));
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
        console.log('view: ', this);
        console.log('model: ', this.model);
      },

      detailsTemplate: $('#book-details-template').html(),

      details: function(e) {
        e.preventDefault();
        console.log('show details: ', e);
        $('.container').empty();
        var html = Mustache.to_html(this.detailsTemplate, this.model.toJSON());
        $('.container').html(html);
        window.appRouter.navigate('details');
      },

      render: function() {
        $('.container').append('You are seeing this, because your web browser supports JavaScript.');
        return this;
      },

    });


  // TODO add comments
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
      // TODO: show details
    }
  });

  window.appRouter = new AppRouter();

  /*
   * alternative, use Backbone pushState API. It needs configuration in the
   * server though.
   */
  // Backbone history: supports back button, and bookmarking
  Backbone.history.start();
}(jQuery));
