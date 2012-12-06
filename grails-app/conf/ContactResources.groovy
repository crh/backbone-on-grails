modules = {

	contact {
		dependsOn 'jquery, lodash, backbone, mustache'

    // TODO: do we need to declare the style URL too?
		resource url: '/scripts/main.js'

    resource url: '/scripts/helpers/helper.js'
    resource url: '/scripts/views/application-view.js'
    resource url: '/scripts/models/application-model.js'
    resource url: '/scripts/routes/application-router.js'

	}

  lodash {
    resource url: '/scripts/vendor/lodash.min.js'
  }

	backbone {
		resource url: '/scripts/vendor/backbone-min.js'
	}

	mustache {
		resource url: '/components/mustache/mustache.js'
	}

}
