/* global $:false, jQuery:false */

/*
 * part 2: + filter basesd on user input. + routing
 */

(function($) {
  console.log('init contact manager app');
  
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g,
    evaluate : /\{!(.+?)!\}/g
  };

  var contacts = [
    {
      name: 'Contact 1',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'family'
    }, {
      name: 'Contact 2',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'family'
    }, {
      name: 'Contact 3',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'friend'
    }, {
      name: 'Contact 4',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'colleague'
    }, {
      name: 'Contact 5',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'family'
    }, {
      name: 'Contact 6',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'colleague'
    }, {
      name: 'Contact 7',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'friend'
    }, {
      name: 'Contact 8',
      address: '1, a street, a town, a city, AB12 3CD',
      tel: '0123456789',
      email: 'anemail@me.com',
      type: 'family'
    }
  ];

  // le Model
  var Contact = Backbone.Model.extend({
    defaults: {
      photo: '/img/placeholder.png',
      name: 'no name',
      type: 'no_type',
      tel: 'no phone',
      email: 'no email',
      address: 'no address'
    },
    initialize: function() {
      console.log('init model ' + JSON.stringify(this));
    }
  });

  // le Collection
  var Directory = Backbone.Collection.extend({
    model: Contact
  });

  // le View
  var ContactView = Backbone.View.extend({
      tagName: 'article',
      className: 'contact-container',

      /*
      <img scr="<%= photo %>" alt="<%= name %>"/>
      <h1><%= name %><span><%= type %></span></h1>
      <div><%= address %></div>
      <dl>
        <dt>Tel:
        <dd><%= tel %>
        <dt>Email:
        <dd><a href="mailto:<%= email %>"><%= email %></a>
      </dl>
      <button id='delete'>Delete</button>
      <button class='edit'>Edit</button>
       */
      template: $('#contactTemplate').html(),
      editTemplate: _.template($('#contactEditTemplate').html()),
      render: function() {
        var tmpl = _.template(this.template);
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
      },
      events: {
        'click button#delete': 'deleteContact',
        'click button.edit': 'editContact',
        'change select.type': 'addType',
        'click button.save': 'saveEdit',
        'click button.cancel': 'cancelEdit'
      },
      deleteContact: function() {
        var removedType = this.model.get('type').toLowerCase();
        this.model.destroy();
        this.remove();
        if (_.indexOf(directory.getTypes(), removedType) === -1) {
          var selectEl = directory.$el.find('#filter select');
          directory.$el.find('#filter select').children(
            '[value="' + removedType + '"]').remove();
        }
      },
      editContact: function() {
        this.$el.html(this.editTemplate(this.model.toJSON()));

        var newOpt = $('<option/>', {
          html: '<em>Add new...</em>',
          value: 'addType'
        });

        this.select =
          directory.createSelect().addClass('type').val(
            this.$el.find('#type').val()).append(newOpt).insertAfter(
            this.$el.find('.name'));
        this.$el.find('input[type="hidden"]').remove();
      },
      addType: function() {
        if (this.select.val() === 'addType') {
          this.select.remove();

          $('<input/>', {
            'class': 'type'
          }).insertAfter(this.$el.find('.name')).focus();
        }
      },
      saveEdit: function(e) {
        e.preventDefault();

        var formData = {};
        prev = this.model.previousAttributes();

        $(e.target).closest('form').find(':input').not('button').each(
          function() {
            var el = $(this);
            formData[el.attr('class')] = el.val();
          });

        // when the user does not provide a new photo, use default one.
        if (formData.photo === '') {
          delete formData.photo;
        }

        // update current model with the new data
        this.model.set(formData);

        // rerender selected contact;
        this.render();

        // TODO ???
        if (prev.photo === 'img/placeholder.png') {
          delete prev.photo;
        }

        // replace in collection the old with the new model.
        _.each(contacts, function() {
          if (_.isEqual(contact, prev)) {
            contacts.splice(_.indexOf(contacts, contact), 1, formData);
          }
        });
      },
      cancelEdit: function() {
        this.render();
      }
    });

  // le main overview, bound to a collection.
  var DirectoryView = Backbone.View.extend({
      el: $('#contacts'),

      initialize: function() {
        console.log('init directory view.');
        this.collection = new Directory(contacts);
        // find element with the id 'filter' and append the created select
        // element
        var selectElement = this.createSelect();
        var filterContainer = this.$el.find('#filter');
        filterContainer.append(selectElement);
        this.render();
        /*
         * bind custom event to a function
         *
         * @see http://backbonejs.org/#Events-on
         *
         * we bind our *custom* event 'change:filterType' to the event handler
         * function
         * this.filterByType
         */
        this.on('change:filterType', this.filterByType, this);

        /*
         * bind 'reset' event to a this.render function
         */
        this.collection.on('reset', this.render, this);

        this.collection.on('add', this.renderContact, this);

        this.collection.on('remove', this.removeContact, this);
      },

      render: function() {
        // remove all contacts, it needed for the filtering.
        this.$el.find('article').remove();
        var that = this;
        _.each(this.collection.models, function(item) {
          that.renderContact(item);
        }, this);
      },

      renderContact: function(item) {
        var contactView = new ContactView({
          model: item
        });
        this.$el.append(contactView.render().el);
      },

      /* @return [array] */
      getTypes: function() {
        // @see http://underscorejs.org/#uniq
        // @usage: _.uniq(array, [isSortedYet], [iterator])
        // @ex.
        // _.uniq([1,2,1,3,1,4])
        // ==> [1,2,3,4]

        // @see http://underscorejs.org/#pluck
        // @usage _.pluck(list, propertyName)
        // @ex.:
        // var stooges = [
        // {name: 'moe', age: 40},
        // {name: 'larry', age: 50},
        // {name: 'curly', age: 60} ];
        // _.pluck(stooges, 'name');
        // ==> ['moe','larry', 'curly']

        // return e.g., ['family', 'colleage', 'friend']
        return _.uniq(this.collection.pluck('type'), false, function(type) {
          // we normalize the value to lower case to prevent case issues
          return type.toLowerCase();
        });
      },

      // @return a HTML Select element ==> drop down box
      createSelect: function() {

        // TODO what this line ? Do we use it?
        var filter = this.$el.find('#filter'),
        // TODO rnd this jQuery usage: $(element, [options]);
        // we create a select element with option as the only child.
        select = $('<select/>', {
          // default falue is 'All'
          // result: <select><option>All</option></select>
          html: '<option>All</option>'
        });

        // for each type, create an option element with value and text
        _.each(this.getTypes(), function(item) {
          var option = $('<option/>', {
            // Paranoid normalization to lower case
            value: item.toLowerCase(),
            text: item.toLowerCase()
          }).appendTo(select);
        });

        return select;

      },

      // register event to the view
      events: {
        /**
         * key:value-pair key: + event type, here 'change' event + selector,
         * here #filter select =
         * find element with the id filter, then find its descendant which is
         * from the type 'select'
         * element value: + event handler, here setFilter
         */
        'change #filter select': 'setFilter',
        'click #add': 'addContact',
        'click #showForm': 'showForm'
      },

      /**
       * event handler
       *
       * @param {object}
       *          e event fired by filter selection.
       */
      setFilter: function(e) {
        // if the user selects 'All', then e.currentTarget.value: 'All'
        this.filterType = e.currentTarget.value;
        this.trigger('change:filterType');
      },

      filterByType: function() {
        if (this.filterType === 'All') {
          /*
           * we update our collection in the bulk to 'contacts'
           *
           * @see http://backbonejs.org/#Collection-reset
           */
          this.collection.reset(contacts);
        } else {
          this.collection.reset(contacts, {
            silent: true
          });
          /*
           * @see http://documentcloud.github.com/underscore/#filter
           */
          var filterType = this.filterType, filtered =
            _.filter(this.collection.models, function(item) {
              return item.get('type').toLowerCase() === filterType;
            });
          this.collection.reset(filtered);
          // changes the URL
          contactsRouter.navigate('filter/' + filterType);
        }
      },
      addContact: function(e) {
        e.preventDefault();

        var newModel = {};
        $('#addContact').find(':input').each(function() {

          if ($(this).val() !== '') {
            newModel[$(this).attr('id')] = $(this).val();
          }
        });

        contacts.push(newModel);

        if (_.indexOf(this.getTypes(), newModel.type === -1)) {
          this.collection.add(new Contact(newModel));
          this.$el.find('#filter').find('select').remove().end().append(
            this.createSelect());
        } else {
          this.collection.add(new Contact(newModel));
        }
      },
      removeContact: function(removedModel) {
        var removed = removedModel.attributes;

        if (removed.photo === '/img/placeholder.png') {
          delete removed.photo;
        }

        _.each(contacts, function(contact) {
          if (_.isEqual(contact, removed)) {
            contacts.splice(_.indexOf(contacts, contact), 1);
          }
        });
      },
      showForm: function() {
        this.$el.find('#addContact').slideToggle();
      }
    });

  // TODO add comments
  var ContactsRouter = Backbone.Router.extend({
    routes: {
      'filter/:type': 'urlFilter'
    },
    urlFilter: function(type) {
      directory.filterType = type;
      directory.trigger('change:filterType');
    }
  });

  var directory = new DirectoryView();
  var contactsRouter = new ContactsRouter();
  // TODO rnd

  /*
   * alternative, use Backbone pushState API. It needs configuration in the
   * server though.
   */
  // Backbone history: supports back button, and bookmarking
  Backbone.history.start();
}(jQuery));
