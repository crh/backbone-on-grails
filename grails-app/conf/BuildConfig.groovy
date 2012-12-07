grails.servlet.version = "3.0"

grails.project.class.dir = "target/classes"

grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"

grails.project.target.level = 1.6
grails.project.source.level = 1.6

grails.project.war.file = "target/next.war"

grails.project.dependency.resolution = {
    inherits("global") {
        // excludes 'ehcache'
    }
    log "warn"
    checksums true
    repositories {
        inherits true

        grailsPlugins()
        grailsHome()
        grailsCentral()

        mavenLocal()
        mavenCentral()
    }
    dependencies {
        // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes eg.
    }

    plugins {
        runtime ":jquery:1.8.0"
        runtime ":resources:1.1.6"
        // Uncomment these (or add new ones) to enable additional resources capabilities
        //runtime ":zipped-resources:1.0"
        //runtime ":cached-resources:1.0"
        //runtime ":yui-minify-resources:0.1.4"
        build ":tomcat:$grailsVersion"
        compile ':cache:1.0.0'
    }
}

grails.server.port.http=4000
