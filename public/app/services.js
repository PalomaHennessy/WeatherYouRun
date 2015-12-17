angular.module('RunServices', ['ngResource'])
.factory('Run', ['$resource', 'Auth', function($resource, Auth) {

  return $resource('/api/runs/:userId', null,
    {
      get: {
        method: "GET",
        cache: false,
        isArray: true
      }
    });
}])
.factory('Auth', ['$window', "$rootScope", function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['secretruns-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['secretruns-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretruns-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      return token ? true : false;
    },
    currentUser: function() {
      if (this.isLoggedIn()) {
        var token = this.getToken();
        try {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload;
        } catch(err) {
          return false;
        }
      }
    }
  }
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    }
  }
}]);