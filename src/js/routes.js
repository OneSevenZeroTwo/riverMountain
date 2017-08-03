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
		}).state('index.ask',{
			url: "/ask",
			templateUrl:'./template/ask.html'
		}).state('index.share',{
			url: "/share",
			templateUrl:'./template/share.html'
		}).state('index.job',{
			url: "/job",
			templateUrl:'./template/job.html'
		}).state('index.good',{
			url: "/good",
			templateUrl:'./template/good.html'
		}).state('detail',{
			url: "/detail/:id",
			templateUrl:'./template/detail.html'
		}).state('about',{
			url: "/about",
			templateUrl:'./template/about.html'
		}).state('login',{
			url: "/login",
			templateUrl:'./template/login.html'
		}).state('register',{
			url: "/register",
			templateUrl:'./template/register.html'
		}).state('getstart',{
			url: "/getstart",
			templateUrl:'./template/getstart.html'
		}).state('mine',{
			url: "/mine",
			templateUrl:'./template/mine.html'
		}).state('user',{
			url: "/user/:username",
			templateUrl:'./template/user.html'
		})
		$urlRouterProvider.when('','/index/topics')
		
		
	}])
})();