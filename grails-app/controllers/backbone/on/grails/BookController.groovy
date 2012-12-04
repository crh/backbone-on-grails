package backbone.on.grails

class BookController {

    def index() {
      def ninjaBook = new Book(title: "Secrets of JavaScript Ninja")
      // TODO: should we use this instead? 
      //mustache.render(template:"bookTemplate", model:[title: ninjaBook.title])
    }
}
