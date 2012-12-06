package backbone.on.grails

class DetailsController {

    def index() {
      // TODO: this is duplicate from BooksController.
      // TODO: extract the data to a file, can we use JSON string in groovy?
  	  def ninjaBook = new Book(title: "Secrets of JavaScript Ninja", author: "J. Ressig")
      render(template:"bookDetailsTemplate", model:[book: ninjaBook])
    }
}
