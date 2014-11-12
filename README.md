![](https://travis-ci.org/PRIDE-Cluster/cluster-web-app.svg?branch=master)

PRIDE Cluster web-app
=====================

A web application for the *EBI PRIDE Cluster* resource. We use mostly [`AngularJS`](https://angularjs.org/) as 
a framework for a *JavaEE* container-based web app.

### Project structure

The web application code is contained within the `app` folder inside `src/main/webapp`. The structure is as follows:

**`app.js`**

Defines the main application context and modules dependencies. The `index.html` files defines the main layout, including
the EBI Frontier template.

**`/views`**

Defines main views and routing, as well as html files for templating and data binding. Each main view can use different
`AngularJS` directives. These are defined within the `components` folder.

**`/components`**

Defines `AngularJS` directives and services. Each component folder is names as `componentName-componentType`. For example
the folder `clusterDetail-directive` contains code that defines the `<prc-cluster-detail/>` directive and the folder
`cluster-service` contains code defining the `Cluster` service to retrieve data from the *PRIDE Cluster* web-service.

### Directives 

`<prc-cluster-detail>`  

Displays information about a given cluster specified by its attribute `clusterid`.  

`<prc-cluster-list>`  

Displays a list of cluster summaries for a given `query` and `sortField` attributes.  
  
### Services 

`ClusterService`  

Provides methods to query the *PRIDE Cluster* web-service at the `clustersummary`  and `clusterdetail` end points.  
 
## Build cycle

### Install Dependencies

There are two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

`npm` has been pre-configured in `package/json` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  Once this is done, you should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `src/main/webapp/app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.

## Testing

### Running Unit Tests

The angular-seed app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```

## Updating Angular

Since the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Continuous Integration

### Travis CI

[Travis CI][travis] is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The PRIDE cluster webapp
project contains a Travis configuration file, `.travis.yml`, which will cause Travis to run the
tests when pushed to GitHub. The results can be seen [here](https://travis-ci.org/PRIDE-Cluster/cluster-web-app).
