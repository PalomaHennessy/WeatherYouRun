angular.module('RunCtrls', ['RunServices'])

//runs

.controller('HomeCtrl', ['$http', '$scope', '$location', '$routeParams', '$route', 'Run', function($http, $scope, $location, $routeParams, $route, Run) {
  $scope.runs = [];
  $scope.search = '';
  console.log("I'm in Home controller");
  Run.query(function success(data) {
    $scope.runs = data;
  }, function error(data) {
    console.log(data)
  });
  $scope.updateRun = function(){
    Run.query({id:  $routeParams.id}, function success(run) { 
      $http({
        method: 'PUT',
        url: '/api/runs/' + $routeParams.id,
        data: {id: $routeParams.id, 
          title: $scope.run.title, 
          date: $scope.run.date, 
          minutes: $scope.run.minutes, 
          hours: $scope.run.hours, 
          distance: $scope.run.distance, 
          note: $scope.run.note
        }
      })
      $location.path('/profile');
    })
  }
  $scope.deleteRun = function(id, idx) {
    $http({
      method: 'DELETE',
      url: '/api/runs/' + id,        
    })
  }
  $route.reload()
}])
.controller('ShowCtrl', ['Auth', '$scope', '$routeParams', 'Run', function(Auth, $scope, $routeParams, Run) {
  userId  = Auth.currentUser().id
  $scope.userId = userId
  $scope.run = {};
  Run.query({user: userId, limit: 10}, function success(data) {
    $scope.runs = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['Auth', '$scope', '$location', 'Run', function(Auth, $scope, $location, Run) {
  var userId  = Auth.currentUser().id
  $scope.run = {
    title: '',
    date: '',
    minutes: '',
    hours: '',
    distance: '',
    note: '',
    user: userId
  };
  $scope.createRun = function() {
    Run.save($scope.run, function success(data) {
      $location.path('/profile');
    }, function error(data) {
      console.log(data);
    });
  }
}])

//auth

.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  }
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    name: '',
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $http.post('/api/auth', $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token);
        $location.path('/profile');
      }, function error(res) {
        console.log(data);
      });
    }, function error(res) {
      console.log(data);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      $("#login").modal("hide");
      $location.path('/weather');
    }, function error(res) {
      console.log(data);
    });
  }
}])

//weather

.controller('WeatherCtrl', ['$scope', '$http', function($scope, $http){
  $scope.getTemperature = function(){
    $http({
      method: 'GET',
// url: 'http://localhost:3000/api/temperatures/'+$scope.place 
url: '/api/temperatures/'+$scope.place 
}).then(function success(res){
  if(res){
    $scope.wDescription = res.data.weather[0].description; 
    $scope.wTemp = res.data.main.temp;
    $scope.wPlace = res.data.name;
    console.log($scope.wTemp);
    switch (true) {
      case $scope.wTemp >= 85:
      clothesArray = death
      console.log(clothesArray)
      break;
      case $scope.wTemp >= 70:
      clothesArray = hot
      console.log(clothesArray)
      break;
      case $scope.wTemp >= 50:
      clothesArray = warm 
      console.log(clothesArray)
      break;
      case $scope.wTemp >= 40:
      clothesArray = brisk 
      console.log(clothesArray)
      break;
      case scope.wTemp >= 20:
      clothesArray = cold
      console.log(clothesArray)
      break;
      case $scope.wTemp >= 0:
      clothesArray = verycold
      console.log(clothesArray)
      break;
    }
    $scope.clothesArray = clothesArray
  }
}, function error(res) {
  console.log(res)
});     
var clothesArray = [];
var veryCold = ['Mittens', 'Long sleeve', 'Heavy jacket', 'Running tights', 'Hat'];
var cold = ['Mittens', 'Long sleeve', 'Light jacket', 'Running tights', 'Hat'];
var brisk = ['Short sleeve', 'Running tights'];
var warm = ['Short sleeve', 'Shorts'];
var hot =['Short sleeve', 'Shorts'];
var death = ['Shorts'];
}
// close controller
}
]
)
