;
(function() {
	//	头部组件 模版
	var directives = angular.module('directives', [])
	directives.directive('xheader', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/xheader.html",
			link: function(scope, ele, attr) {
				//				头部的图片

				scope.headerImg = "./images/nodejs.png"

				//返回上一个页面
				scope.back = function() {
					$window.history.back();
				}
				//点击出现侧边栏,出现遮罩层
				$rootScope.sidebarstate = false;
				$rootScope.sidebarstateOut = false;
				scope.sideIn = function() {
					console.log(scope.sidebarstate)
					$rootScope.sidebarstateOut = false;
					$rootScope.sidebarstate = true;
				}
			}
		}
	}])

	//chuan.................................................................index

	//	头部
	directives.directive('xindexheader', ['$rootScope', function($rootScope) {
		return {
			templateUrl: "directive/chuanyeIndex/xheader.html",
			link: function(scope, ele, attr) {
				console.log("header")

			}
		}
	}])

	//	轮播图
	directives.directive('xindexswiper', [function() {
		return {
			templateUrl: "directive/chuanyeIndex/xswiper.html",
			link: function(scope, ele, attr) {
				//				轮播图插件
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 3000,
					autoplayDisableOnInteraction: false
				});
			}
		}
	}])
	//	导航栏
	directives.directive('xindexnav', [function() {
		return {
			templateUrl: "directive/chuanyeIndex/xnav.html",
			link: function(scope, ele, attr) {

			}
		}
	}])
	//	广告
	directives.directive('xindexguanggao', [function() {
		return {
			templateUrl: "directive/chuanyeIndex/xguanggao.html",
			link: function(scope, ele, attr) {

			}
		}
	}])
	// 首页的列表页
	directives.directive('xindexlist', ['$state', '$http', '$window', function($state, $http, $window) {
		return {
			templateUrl: "directive/chuanyeIndex/xlist.html",
			link: function(scope, ele, attr) {
				//				首页列表页请求
				scope.arr = [];
				scope.page = 1;
				scope.isLoadMore = 0;

				scope.shows = function() {

					$http({
						methods: 'get',
						url: 'http://w.lefeng.com/api/neptune/special_brands/v3?page=' + scope.page + '&labelType=1'
					}).then(function(data) {
						console.log(data.data)
						scope.aaa = data.data.data
						scope.arr = scope.arr.concat(scope.aaa)
						console.log(scope.arr)

						scope.isLoadMore++;

					})
				}
				scope.shows()
				scope.isLoadMore--;
				
				$(window).scroll(function() {
					if($(window).scrollTop() >= scope.page * 3000) {
						scope.page++
							console.log(scope.page)
						scope.shows()
						scope.isLoadMore--;

					}
				})

				scope.goToDetail = function(id) {
					$window.location.href = "#!/list/" + id
				}
			}
		}
	}])
	// 首页的底部
	directives.directive('xindexfloor', [function() {
		return {
			templateUrl: "directive/chuanyeIndex/xfloor.html",
			link: function(scope, ele, attr) {

			}
		}
	}])
	// 回到顶部按钮
	directives.directive('xindextop', [function() {
		return {
			templateUrl: "directive/chuanyeIndex/xtop.html",
			link: function(scope, ele, attr) {
				//返回顶部
				$(document).scroll(function() {
					//					console.log(222)
					if($(document).scrollTop() > 100) {
						//				console.log(23322)
						$('.icon4').fadeIn();

					} else {
						$('.icon4').fadeOut()

					}

				});
				//按钮top
				$('.icon4').on('click', function() {
					console.log('11111')
					$('body,html').stop(true).animate({
						scrollTop: 0
					}, 500)
				})
			}
		}
	}])
	// 侧边栏
	directives.directive('xindexsidebar', ['$state', '$http', '$rootScope', '$window', function($state, $http, $rootScope, $window) {
		return {
			templateUrl: 'directive/chuanyeIndex/xsidebar.html',
			//日！！！日
			//			scope: {},
			transclude: true,
			link: function(scope, ele, attr) {
				//				很奇怪的侧边栏
				console.log('sidebar')
				scope.sideout = false
				scope.sidein = false
				scope.changeshow = function() {
					console.log("侧边栏出来")
					scope.sideout = true
					scope.sidein = false
				}
				scope.changehide = function() {
					console.log("侧边栏回去")
					scope.sideout = false
					scope.sidein = true
				}
				//	侧边栏热门搜索
				$http({
					methods: 'get',
					url: 'http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10'
				}).then(function(data) {
					console.log(data.data.data)
					scope.news = data.data.data

				})
			}
		}
	}])
	//	loading
	directives.directive('xindexzhe', [function() {
		return {
			templateUrl: 'directive/chuanyeIndex/xzhe.html',
			link: function(scope, ele, attr) {
				scope.zhe = true
			}
		}
	}])
	//liang..................................................................list

	//tang.................................................................detail

	//buyCar..............................................................zhang

})();