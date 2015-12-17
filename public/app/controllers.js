angular.module('RunCtrls', ['RunServices'])

//runs

.controller('HomeCtrl', ['$scope', 'Run', function($scope, Run) {
  $scope.runs = [];
  $scope.search = '';
  console.log("I'm in Home controller");

  Run.query(function success(data) {
    $scope.runs = data;
  }, function error(data) {
    console.log(data)
  });

  $scope.deleteRun = function(id, runsIdx) {
    Run.delete({id: id}, function success(data) {
      $scope.runs.splice(runsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['Auth', '$scope', '$routeParams', 'Run', function(Auth, $scope, $routeParams, Run) {
	userId  = Auth.currentUser().id
	$scope.userId = userId
	console.log('***',userId)
  $scope.run = {};
  Run.query({user: userId, limit: 10}, function success(data) {
    $scope.runs = data;
    console.log('testing',data)
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['Auth', '$scope', '$location', 'Run', function(Auth, $scope, $location, Run) {
  console.log('im in new controller')
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

  // console.log($scope.userId)

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
	console.log("I'm in NavController");
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
      console.log('hitting this?')
    });
  }
}])
  
//weather

.controller('WeatherCtrl', ['$scope', '$http', function($scope, $http){

			$scope.getTemperature = function(){
				console.log('hittinh?')
				$http({
				 method: 'GET',
				 url: 'http://localhost:3000/api/temperatures/'+$scope.place 
				}).then(function success(res){
					if(res){
						console.log('inside',res)
						$scope.wDescription = res.data.weather[0].description; 
						$scope.wTemp = res.data.main.temp;
						$scope.wPlace = res.data.name;
						console.log($scope.wDescription, '$scope.wDescription')
					}

							   console.log(res)
							 }, function error(res) {
								}	   
				) 
				console.log('test',$scope.wDescription)
				




				// if (Array.isArray(location)){
				// 	req.params.lat = location[0];
				// 	req.params.lon = location[1];
				// } else {
				// 	req.params.q=location;
				// }
				// $http(req).success(function(data){
				// 	if(data && data.weather){
				// 		$scope.wDescription = data.weather[0].description;
				// 		$scope.wTemp = data.main.temp;
				// 		$scope.wPlace = data.name;
				// 		console.log(data.name)
				// 	}
				// });

				// if(angular.isDefined($element.attr('location'))){
				// 	$scope.$watch('location', function(){
				// 		$scope.wTemp=false;
				// 		if(!$scope.location) return;
				// 		getTemperature($scope.location)
				// 	});
				// } else {
				// 	if(navigator.geolocation){
				// 		navigator.geolocation.getCurrentPosition(function(position){
				// 			getTemperature([position.coords.latitude, position.coords.longitude]);
				// 		});
				// 	} else {
				// 		alert('Sorry your browser does not support geolocation.');
				// 	}
				// 	replace: true,
					// template: '<div class="well"><span ng-hide="wTemp">Loading..</span><span ng-show="wTemp">It is {{wTemp}}&deg;F {{wDescription}} in {{wPlace}}.</span></div>'
				// }	

		

			}

		}
	]
)
