modules = {

	contact {
		dependsOn 'jquery, underscore, backbone'

		resource url: 'css/screen.css'
		resource url: '/js/app.js'
	}


	underscore {
		resource url: '/js/vendor/underscore.js'
	}

	backbone {
		resource url: '/js/vendor/backbone.js'
	}

}