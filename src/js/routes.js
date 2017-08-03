;
(function() {
	var routes = angular.module('routes', [])
	routes.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('index',{
			url: "/index",
			templateUrl:'./template/index.html'
		}).state('index.topics',{
			url: "/topics",
			templateUrl:'./template/topics.html'
		}).state('detail',{
			url: "/detail/:id",
			templateUrl:'./template/detail.html'
		}).state('login',{
			url: "/login",
			templateUrl:'./template/login.html'
		}).state('register',{
			url: "/register",
			templateUrl:'./template/register.html'
		})
		$urlRouterProvider.when('','/index/topics')
		
		
	}])
})();