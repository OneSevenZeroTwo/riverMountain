;
(function() {
	//头部组件
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
	//footer组件
	directives.directive('xfooter', function() {
		return {
			templateUrl: "directive/xfooter.html",
			link: function(scope, ele, attr) {
				console.log("footer加载")
				scope.nav = [{
					ionClass: 'icon-wxbpinpaibao',
					tabName: '首页',
					href: '#!/index/topics'
				}, {
					ionClass: 'icon-jieban',
					tabName: '分享',
					href: '#!/index/share'
				}, {
					ionClass: 'icon-xiaoxi',
					tabName: '问答',
					href: '#!/index/ask'
				}, {
					ionClass: 'icon-biaoqian',
					tabName: '招聘',
					href: '#!/index/job'
				}, {
					ionClass: 'icon-zan',
					tabName: '精华',
					href: '#!/index/good'
				}]
			}
		}
	})

	//搜素栏组件
	directives.directive('xsearch', function() {
		return {
			templateUrl: "directive/xsearch.html",
			link: function(scope, ele, attr) {
				console.log("搜索栏加载")
				//点击搜索框使它变为可以搜索状态。
				scope.isFocusing = false;
				scope.searchValue = "";
				scope.isSearching = function() {
					scope.isFocusing = true;
				}

				//点击X清空搜索框数据。
				scope.searchClear = function() {
					scope.searchValue = "";
				}
			}
		}
	})
	//加载中组件。
	directives.directive('xloading', ['$timeout', function($timeout) {
		return {
			templateUrl: "directive/xloading.html",
			link: function(scope, ele, attr) {
				console.log("loading加载")
				//scope.allLoading++的地方都要运行这个函数。
				scope.loadingRemove = function() {
					$timeout(function() {
						scope.allLoading = 0
					}, 5000)
				}
				scope.allLoading = 0
				scope.loadingRemove()
			}
		}
	}])
	//轮播图组件
	directives.directive('xswiper', ['tool', '$http', '$timeout', function(tool, $http, $timeout) {
		return {
			templateUrl: "directive/xswiper.html",
			link: function(scope, ele, attr) {
				console.log("轮播图加载")
				//控制所有请求完成状态的变量
				//				scope.allLoading = 0;
				//轮播图图片
				//				scope.allLoading++;
				//				scope.loadingRemove();
				//				//定时器模拟加载延迟，才看得多xloading组件的效果
				//				$timeout(function() {
				//					$http({
				//						url: "http://localhost:3000/readFile"
				//					}).then(function(res) {
				//						if(scope.allLoading != 0) {
				//							scope.allLoading--;
				//						}
				//						//						console.log(res.data)
				//						scope.imgArr = res.data
				//					})
				//
				//				}, 1000)
				scope.imgArr = ["images/4.jpg", "images/5.jpg", "images/1.jpg", "images/2.jpg", "images/3.jpg", "images/6.jpg", "images/7.jpg", "images/8.jpg", "images/9.jpg", "images/10.jpg"]

				//轮播图驱动
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay: 2500,
					autoplayDisableOnInteraction: false
				});
				//点击查看大图

			}
		}
	}])
	//列表组件
	directives.directive('xlist', ['$http', '$window', '$rootScope', function($http, $window, $rootScope) {
		return {
			templateUrl: "directive/xlist.html",
			link: function(scope, ele, attr) {
				console.log("list加载")
				//进入路由判断当前的nav值，决定那个footerNav高亮
				switch(true) {
					case !attr.channel:
						scope.activingNav = 0
						break;
					case attr.channel == "share":
						scope.activingNav = 1
						break;
					case attr.channel == "ask":
						scope.activingNav = 2
						break;
					case attr.channel == "job":
						scope.activingNav = 3
						break;
					case attr.channel == "good":
						scope.activingNav = 4
						break;
				}
				scope.isLoading = true;
				scope.page = 1;
				scope.arr = [];
				scope.toDetail = function(id) {
					$window.location.href = "#!/detail/" + id
				}
				//点击加载更多
				scope.loadMore = function() {
					scope.isLoading = false;
					scope.allLoading++;
					scope.loadingRemove();
					$http({
						url: ' https://cnodejs.org/api/v1/topics',
						params: {
							tab: attr.channel,
							limit: 10,
							page: scope.page++
						}
					}).then(function(res) {
						console.log(res)
						scope.arr = scope.arr.concat(res.data.data)
						scope.isLoading = true;

						//所有请求都完成才取消loading遮罩
						if(scope.allLoading != 0) {
							scope.allLoading--;
						}

					})
				}
				//后台请求数据动态生成列表
				scope.loadMore()
				//点击头像和用户名进入urer路由
				scope.user = function(username) {
					console.log(username)
					$window.location.href = "#!/user/" + username
				}

			}
		}
	}])

	//显示大图组件
	directives.directive('xgallery', ['$rootScope', function($rootScope) {
		return {
			templateUrl: "directive/xgallery.html",
			link: function(scope, ele, attr) {
				console.log("显示大图加载")
				scope.galleryIsShow = false;
				//需要显示大图的地方调用这个函数。传进图片地址作为参数
				scope.showPic = function(imgUrl) {
					scope.imgUrl = imgUrl;
					scope.galleryIsShow = true;
				}
				scope.galleryBack = function() {
					scope.galleryIsShow = false;
				}
			}
		}
	}])

	//详情页组件
	directives.directive('xdetail', ['$state', '$http', function($state, $http) {
		return {
			templateUrl: "directive/xdetail.html",
			link: function(scope, ele, attr) {
				console.log("详情页加载")
				var id = $state.params.id;

				$http({
					url: " https://cnodejs.org/api/v1/topic/" + id
				}).then(function(res) {
					scope.detailData = res.data.data
					console.log(scope.detailData)
				})

			}
		}
	}])

	//侧边栏主键
	directives.directive('xsidebar', ['$rootScope', function($rootScope) {
		return {
			templateUrl: "directive/xsidebar.html",
			link: function(scope, ele, attr) {
				$rootScope.sidebarstateOut = false;
				console.log("侧边栏加载")
				scope.mineLeave = function() {
					$rootScope.sidebarstate = false
					$rootScope.sidebarstateOut = true;
				}

			}
		}
	}])

	//about栏主键
	directives.directive('xabout', [function() {
		return {
			templateUrl: "directive/xabout.html",
			link: function(scope, ele, attr) {
				console.log("about加载")

			}
		}
	}])
	//新手入门主键
	directives.directive('xgetstart', [function() {
		return {
			templateUrl: "directive/xgetstart.html",
			link: function(scope, ele, attr) {
				console.log("新手入门加载")

			}
		}
	}])
	//注册主键
	directives.directive('xregister', [function() {
		return {
			templateUrl: "directive/xregister.html",
			link: function(scope, ele, attr) {
				console.log("注册加载")

			}
		}
	}])
	//登录主键
	directives.directive('xlogin', [function() {
		return {
			templateUrl: "directive/xlogin.html",
			link: function(scope, ele, attr) {
				console.log("登录加载")

			}
		}
	}])
	//mine主键
	directives.directive('xmine', ['$http', function($http) {
		return {
			templateUrl: "directive/xuser.html",
			link: function(scope, ele, attr) {
				console.log("mine加载")
				scope.username = 'as13579e'
				$http({
					method: 'get',
					url: 'https://cnodejs.org/api/v1/user/' + scope.username,
				}).then(function(res) {
					console.log(res)
					scope.arr = res.data.data
					console.log(scope.arr)
				})
			}
		}
	}])
	//xuser主键
	directives.directive('xuser', ['$http', '$state', function($http, $state) {
		return {
			templateUrl: "directive/xuser.html",
			link: function(scope, ele, attr) {
				console.log("xuser加载");

				scope.username = $state.params.username;
				scope.num = 5;
				$http({
					method: 'get',
					url: 'https://cnodejs.org/api/v1/user/' + scope.username,
				}).then(function(res) {
					console.log(res)
					scope.arr = res.data.data
					console.log(scope.arr)
				})

			}
		}
	}])

})();