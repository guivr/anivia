'use strict'

const Router = {
  init() {
    this.applyHashChangeEvent();
    this.navigateToRoute(this.getCurrentRoute());
  },

  reset() {
    this.routes = [];
  },

  loadRoute(name) {
    return new Promise((resolve, reject) => {
      let xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = () => {
        if(xmlhttp.readyState === XMLHttpRequest.DONE ) {
          if(xmlhttp.status === 200) {
            document.getElementById('viewer').innerHTML = xmlhttp.responseText;

            resolve();

            return;
          }

          reject(xmlhttp);
        }
      };

      xmlhttp.open('GET', `${name}.html`, true);
      xmlhttp.send();
    });
  },

  getCurrentRoute() {
    let routePath = location.hash == '#/' ? '' : location.hash.split('#/')[1],
      curr = '';

    this.routes.forEach(routeData => {
      let route = routeData.route;

      if (typeof route === 'object') {
        if (this.routes.indexOf(routePath) > -1) {
          curr = routePath;
          return;
        }
      }

      if (route === routePath) {
        curr = routePath;
      }
    });

    return curr;
  },

  configMap(routes) {
    this.routes = routes;
    this.init();
  },

  navigateToRoute(route) {
    let currentRoute = this.getCurrentRoute(),
      foundRoute = getObjectFromArray(this.routes, 'route', currentRoute);

    this.loadRoute(foundRoute.moduleId).then(() => {
      document.title = foundRoute.title;
    }).catch(res => {
      throw new Error('Status error with route view: ' + res.status);
    });

    location.hash = `/${currentRoute}`;
  },

  applyHashChangeEvent() {
    window.onhashchange = () => {
      this.navigateToRoute(this.getCurrentRoute());
    };
  }
};

function getObjectFromArray(arr, key, value) {
  return arr.filter(obj => {
    let prop = obj[key];

    if (typeof prop === 'object') {
      return !!prop.filter(val => value === val).length;
    }

    return prop === value;
  })[0];
}
