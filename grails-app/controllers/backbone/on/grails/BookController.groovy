package backbone.on.grails

class BookController {

    def index() {
      def ninjaBook = new Book(title: "Secrets of JavaScript Ninja")
      mustache.render(template:"bookTemplate", model:[title: ninjaBook.title])
    }
}
