backbone.js on grails
=====================

a prototype to show case how to integrate backbone.js and mustache.js on grails. It
is also a proof of concept for delivering web app with progressive
enhancement in mind.

requirements
------------

* grails v.2.1.1
* [grails mustache plugin](https://github.com/edvinasbartkus/grails-mustache)

how to run
----------

  1. `grails -Dserver.port=4000 run-app`
  2. open `http://localhost:4000/` with a web browser

how to deploy
------------

  1. `grails clean && grails war`
  2. `scp target/${app-name}.war
     usernam@hostname:${relative-path-to-web-container}`

thanks
------

[Dan Wellman](http://www.danwellman.co.uk/) for the [backbone.js tutorials](
http://net.tutsplus.com/sessions/build-a-contacts-manager-using-backbone-js/)

[Lauri Piispanen](https://github.com/lauripiispanen) for the [how to
integrate backbone.js with Grails](http://lauripiispanen.github.com/blog/2012/01/31/building-a-backend-for-backbone-dot-js-todos-example-with-grails-and-mongodb/)

license
-------

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
