'use strict';
backboneOnGrails.Routers.AppRouter = Backbone.Router.extend({

  initialize: function() {
    // TODO: put the JSON into separate file.
    backboneOnGrails.Models.ninjaBook = new backboneOnGrails.Models.Book(
      {
        'title': 'Secrets of JavaScript Ninja',
        'author': 'J. Ressig'
      }
    );

    backboneOnGrails.Views.bookView = new backboneOnGrails.Views.BookView(
      {model: backboneOnGrails.Models.ninjaBook}
    );
  },

  routes: {
    '': 'home',
    'details': 'details'
  },

  home: function() {
    console.log('home', this);
    backboneOnGrails.Views.bookView.render();
  },

  details: function() {
    console.log('details', this);
    backboneOnGrails.Views.bookView.details();
  }

});
