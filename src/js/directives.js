;
(function() {
	//	头部组件 模版
	var directives = angular.module('directives', [])
	directives.directive('xheader', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/xheader.html",
			link: function(scope, ele, attr) {
				//				头部的图片
				console.log("header加载")
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
	directives.directive('xindexheader', [function() {
		return {
			templateUrl: "directive/chuanyeIndex/xheader.html"
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
	directives.directive('xindexlist', [function() {
		return {
			templateUrl: "directive/chuanyeIndex/xlist.html",
			link: function(scope, ele, attr) {

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

			}
		}
	}])
	// 侧边栏
	//	directives.controller("indexCtrl", function($scope) {
	//		$scope.directionTo = function(direction) {
	//			console.log(1111111)
	//			$scope.$emit("sidebar-move-left", direction)
	//		}
	//	})
	directives.directive('xindexsidebar', ['$rootScope', '$window', function($rootScope, $window) {
		return {
			templateUrl: 'directive/chuanyeIndex/xsidebar.html',
			scope: {},
			transclude: true,
			link: function(scope, ele, attr) {
				$rootScope.directionTo = function(direction) {
					$rootScope.direction = direction
					console.log($rootScope.direction)
					scope.$emit("sidebar-move-left", direction)
				}
				$rootScope.$on("sidebar-move-left", function(err, data) {
					console.log(data)
					scope.direction = data
				})

			}
		}
	}])
	//liang..................................................................list

	//tang.................................................................detail

	//buyCar..............................................................zhang

})();