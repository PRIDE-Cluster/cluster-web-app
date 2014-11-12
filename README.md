![](https://travis-ci.org/PRIDE-Cluster/cluster-web-app.svg?branch=master)

PRIDE Cluster web-app
=====================

A web application for the *EBI PRIDE Cluster* resource.

### Technology stack

We use mostly [`AngularJS`](https://angularjs.org/) as a framework for a *JavaEE* container-based web app.

### Project structure

The web application code is contained within the `app` folder inside `webapp`. The structure is as follows:

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
 





