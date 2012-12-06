'use strict';
window.backboneOnGrails = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function() {
    console.log('Hello from Backbone!');

    backboneOnGrails.helper.loadTemplates(['book', 'bookDetails'], function() {
      backboneOnGrails.Routers.appRouter = new backboneOnGrails.Routers.AppRouter();

      // TODO: in developement mode replace this with the commented code below:
      //Backbone.history.start({pushState: true});
      Backbone.history.start({pushState: true, root: '/next/'});
    });
  }
};

$(document).ready(function(){
  backboneOnGrails.init();
});

