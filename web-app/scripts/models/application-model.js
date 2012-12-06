'use strict';
backboneOnGrails.Models.Book = Backbone.Model.extend({
  defaults: {
    title: 'no title',
    author: 'no author'
  },
  initialize: function() {
    console.log('create a book: ' + JSON.stringify(this));
  }
});
