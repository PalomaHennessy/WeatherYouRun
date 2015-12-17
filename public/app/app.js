var MyApp = angular.module('WeatherApp', ['ngRoute', "RunCtrls", "RunServices"]);
// var MyApp = angular.module('WeatherApp', ['ngRoute', 'RunServices']);

MyApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	console.log('App Running')
	$routeProvider
	.when('/', {
		templateUrl: 'app/views/home.html'
	})
	.when('/signup', {
		templateUrl: 'app/views/signup.html',
		controller: 'SignupCtrl'
	})
	.when('/profile',{
		templateUrl: 'app/views/profile.html',
		controller:'ShowCtrl'
	})
	.when('/profile/logrun',{
		templateUrl: 'app/views/logrun.html',
		controller: 'NewCtrl'
	})
	.when('/profile/:id', {
		templateUrl: 'app/views/editrun.html',
	})
	.when('/weather',{
		templateUrl: 'app/views/weather.html',
		controller: 'WeatherCtrl'
	})
	.when('/about',{
		templateUrl: 'app/views/about.html'
	})
	.otherwise({
		templateUrl: 'app/views/404.html'
	});
	$locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]).run(["$rootScope", "Auth", function($rootScope, Auth) {
  $rootScope.isLoggedIn = function() {
    return Auth.isLoggedIn.apply(Auth);
  };
}]);