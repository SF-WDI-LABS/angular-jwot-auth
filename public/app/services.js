angular.module('RecipeServices', ['ngResource'])
.factory('Recipe', ['$resource', function($resource) {
  return $resource('/api/recipes/:id');
}])
.factory('UserService', ['$http', 'Auth', function($http, Auth) {
  var URL = '/api/users';
  return {
    createAccount: function(params) {
      var req = {
        url: URL,
        method: "POST",
        data: params
      }
      return $http(req).then(function success(res) {
        if (res.status !== 200) {
          console.log("couldn't create user:", res.data.message);
          return false;
        }
        console.log("User Create response:", res.data);
        return res.data;
      }, function error(res) {
        console.log("error response:", res);
      });
    },
    login: function(params) {
      var req = {
        url: '/api/auth',
        method: 'POST',
        data: params
      }
      return $http(req).then(function(res) {
        console.log("got network:", res);
        if (res.status !== 200) {
          return false;
        }
        Auth.saveToken(res.data.token);
        return res.data.user;
      })
    }
  }
}])
.factory('Auth', ['$window', function($window) {
  return {
    saveToken: function(token) {
      $window.localStorage['secretrecipes-token'] = token;
    },
    getToken: function() {
      return $window.localStorage['secretrecipes-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretrecipes-token');
    },
    isLoggedIn: function() {
      var token = this.getToken();
      if (token) {
        console.log("logged in", token);
        return true;
      } else {
        console.log("not logged in", token);
        return false;
      }
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
