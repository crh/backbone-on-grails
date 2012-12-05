package backbone.on.grails

class DetailsController {

    def index() {
	  def ninjaBook = new Book(title: "Secrets of JavaScript Ninja", author: "J. Ressig")
      render(template:"bookDetailsTemplate", model:[book: ninjaBook])
    }
}
