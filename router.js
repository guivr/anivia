'use strict'

var Router = {
	actualRoute: '/',
    reset: function () {
      this.routes = [];
    },
    loadRoute: function (name) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if (xmlhttp.status == 200) {
                   document.getElementById('viewer').innerHTML = xmlhttp.responseText;
               }
               else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
               }
               else {
                    alert('something else other than 200 was returned');
               }
            }
        };

        xmlhttp.open('GET', name+'.html', true);
        xmlhttp.send();
    },
    getActualRoute: function () {
        this.actualRoute = location.hash == '#/' ? '':location.hash.split('#/')[1];

        var checkRoute = this.routes;

        for (var i = 0; i <= checkRoute.length-1; i++){
            if(typeof checkRoute[i].route === 'object'){
                if(location.hash.split('#/')[1]){
                    for (var j = 0; j <= checkRoute[i].route.length-1; j++) {
                        if(location.hash.split('#/')[1] == checkRoute[i].route[j]) {
                            this.actualRoute = checkRoute[i].route[j];
                        }
                    }
                } else {
                    this.actualRoute = '';
                }
            } else {
                if(location.hash.split('#/')[1] == checkRoute[i].route){
                    this.actualRoute = checkRoute[i].route;
                }
            }
        }

    	this.navigateToRoute(this.actualRoute);
    },
    configMap: function (routes) {
    	this.routes = routes;
    	this.getActualRoute();
    },
    navigateToRoute: function (route) {
    	this.actualRoute = route;
    	location.hash = '/'+this.actualRoute;

        for (var i = 0; i <= this.routes.length-1; i++){
            if(typeof this.routes[i].route === 'object'){
                for (var j = 0; j <= this.routes[i].route.length-1; j++) {
                    if(this.routes[i].route[j] == this.actualRoute){
                        this.loadRoute(this.routes[i].moduleId);
                    }
                }
            } else {
                if(this.actualRoute == this.routes[i].route){
                    this.loadRoute(this.routes[i].moduleId);
                }
            }
        }
    }
};
