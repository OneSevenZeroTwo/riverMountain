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
		}).state('brand',{
			url: "/brand/:brandId",
			templateUrl:'./template/brand.html'
		}).state('brand2',{
			url: "/brand2/:brandId",
			templateUrl:'./template/brand2.html'
		}).state('hitao',{
			url: "/hitao/:brandId",
			templateUrl:'./template/hitao.html'
		}).state('detail',{
			url: "/detail/:id",
			templateUrl:'./template/detail.html'
		}).state('common',{
			url: "/common",
			templateUrl:'./template/common.html'
		}).state('login',{
			url: "/login",
			templateUrl:'./template/login.html'
		}).state('register',{
			url: "/register",
			templateUrl:'./template/register.html'
		}).state('buycar',{
			url: "/buycar",
			templateUrl:'./template/buycar.html'
		}).state('address',{
			url: "/address",
			templateUrl:'./template/address.html'
		})
		$urlRouterProvider.when('','/index')
		
		
	}])
})();