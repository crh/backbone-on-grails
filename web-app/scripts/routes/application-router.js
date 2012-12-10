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

    backboneOnGrails.Views.bookView.render();

    var msg = '';
    if (Modernizr.cssgradients) {
      msg = 'Your browser has support for CSS Gradients, ';
    } else {
      msg = 'Your browser does _not_ support CSS Gradients, ';
    }

    if (Modernizr.geolocation) {
      this.getUserLocation();
      msg = msg + ' and has support for Geo Location. ';
    } else {
      msg = msg + ' and does _not_ has support for Geo Location. ';
    }

    if (Modernizr.inputtypes.number &&
        Modernizr.input.required &&
        Modernizr.input.placeholder) {
      msg = msg + ' and support for html type number, required and placeholder. ';
    } else {
      msg = msg + ' and does _not_ support html type number, required nor placeholder. ';
    }

    $(".alert").append(msg);
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
  },
                                                                
  getUserLocation: function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('position: ', position);
      console.log('latitude: ' + position.coords.latitude);
      console.log('longitude: ' + position.coords.longitude);

      $('#lat').val(position.coords.latitude);
      $('#long').val(position.coords.longitude);


      var mapcanvas = $('<div/>', {
          id: 'mapcanvas',
          style: 'height: 500px; width: 500px'
      });
      mapcanvas.appendTo('.container');

      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var mapcanvas = document.getElementById('mapcanvas');
      var map = new google.maps.Map(mapcanvas, myOptions);

      var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
      });

    },function(msg) {

    });
  }

});
