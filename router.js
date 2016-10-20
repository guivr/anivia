'use strict'

const Router = {
    currentRoute: '',

    init() {
        this.navigateToRoute(this.getCurrentRoute());
    },

    reset() {
      this.routes = [];
    },

    loadRoute(name) {
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = () => {
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

    getCurrentRoute() {
        this.currentRoute = location.hash == '#/' ? '':location.hash.split('#/')[1];

        const routes = this.routes;

        for (let i = 0; i <= routes.length-1; i++){
            if(typeof routes[i].route === 'object'){
                if(location.hash.split('#/')[1]){
                    for (let j = 0; j <= routes[i].route.length-1; j++) {
                        if(location.hash.split('#/')[1] == routes[i].route[j]) {
                            this.currentRoute = routes[i].route[j];
                        }
                    }
                } else {
                    this.currentRoute = '';
                }
            } else {
                if(location.hash.split('#/')[1] == routes[i].route){
                    this.currentRoute = routes[i].route;
                }
            }
        }

    	return this.currentRoute;
    },

    configMap(routes) {
    	this.routes = routes;
        this.init();
    },

    navigateToRoute(route) {
    	this.currentRoute = route;
    	location.hash = '/'+this.currentRoute;

        for (let i = 0; i <= this.routes.length-1; i++){
            if(typeof this.routes[i].route === 'object'){
                for (let j = 0; j <= this.routes[i].route.length-1; j++) {
                    if(this.routes[i].route[j] == this.currentRoute){
                        this.loadRoute(this.routes[i].moduleId);
                        document.title = this.routes[i].title;
                    }
                }
            } else {
                if(this.currentRoute == this.routes[i].route){
                    this.loadRoute(this.routes[i].moduleId);
                    document.title = this.routes[i].title;
                }
            }
        }
    }
};