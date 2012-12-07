'use strict';
backboneOnGrails.Views.BookView = Backbone.View.extend({

  el: $('.book'),

  events: {
    'click a.details': 'details'
  },

  initialize: function() {
    console.log('create the book view: ', this);
  },

  details: function(e) {
    console.log('show details: ', e);

    e.preventDefault();
    $('.container').empty();
    var template =  backboneOnGrails.helper.get('bookDetails');
    var html = Mustache.to_html(template, this.model.toJSON());
    $('.container').html(html);

    backboneOnGrails.Routers.appRouter.navigate('details');
  },

  render: function() {
    $('.container').append('You can see _this_ text, because' +
      ' your web browser supports JavaScript. Please try to load the page ' +
      'with JavaScript disabled');
    return this;
  }

});
