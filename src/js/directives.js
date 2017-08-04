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
	//头部广告部分
	directives.directive('xad', ['$location','$http',function( $location,$http) {
			return {
				templateUrl: 'directive/Tdetail/xad.html',
				link: function(scope, ele, attr) {
					$('.left').on('click', function() {
						console.log(555)
						$('.adver').hide()
						
					});
					//发送ajax请求,获取页面所需数据
					(function(){
						//获取商品ID
						console.log($location.url().slice(-8));
						var gidnum = $location.url().slice(-8);
						$http({
							type:"get",
							url:"http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1",
							params:{
								needBrandInfo:true,
								gid:gidnum
								
							}
						}).then(function(res){
							console.log(res.data.data)
							scope.msg = res.data.data
						})
					})();
				}
			}
		}])
		//头部
	directives.directive('xdheader', function() {
			return {
				templateUrl: 'directive/Tdetail/xdheader.html',
				link: function(scope, ele, attr) {
					//函数逻辑
					$('.icon-arrow-left').on('click', function() {
						window.history.go(-1);
					});
					$('.home').on('click', function() {
						location.href = '#!/index'
					});
					
				}
			}
		})
		//商品及价格优惠
	directives.directive('xdsection1', function() {
			return {
				templateUrl: 'directive/Tdetail/xdsection1.html',
				link: function(scope, ele, attr) {

					// 点击收藏和取消收藏
					$('#aaa').on('click', function() {
						if($(this).hasClass('active')) {
							$(this).removeClass('active');
							$('.weui-skin_android').show().find('.weui-actionsheet__cell').text('取消收藏商品成功');
							setTimeout(function() {
								$('.weui-skin_android').hide();
							}, 1000)
						} else {
							$(this).addClass('active');
							$('.weui-skin_android').show().find('.weui-actionsheet__cell').text('收藏商品成功');
							setTimeout(function() {
								$('.weui-skin_android').hide();
							}, 1000)
						}
					})
				}
			}
		})
		//商品评价
	directives.directive('xdsection2',function() {
			return {
				templateUrl: 'directive/Tdetail/xdsection2.html',
				link: function(scope, ele, attr) {
					//函数逻辑
				}
			}
		})
		//花粉点
	directives.directive('xhuafen', function() {
			return {
				templateUrl: 'directive/Tdetail/xhuafen.html',
				link: function(scope, ele, attr) {
					//函数逻辑
				}
			}
		})
		//商品评价及商品信息
	directives.directive('xcommon', function() {
			return {
				templateUrl: 'directive/Tdetail/xcommon.html',
				link: function(scope, ele, attr) {
					//点击查看图文详情
					$('.click-to-detail').click(function() {
						console.log('ff')
						$(".image-detail").show()
						$(".click-to-detail").remove()

					});

					// 点击切换商品信息和购物说明
					$('ul.tag-list').on('click', 'li', function() {
						$(this).addClass('active').siblings().removeClass('active');
						if($(this).index() == 0) {
							$('.note').hide();
							$('.desc').show();
						} else {
							$('.note').show();
							$('.desc').hide();
						}
					})
				}
			}
		})
		//底部购物车
	directives.directive('xdcar', function() {
			return {
				templateUrl: 'directive/Tdetail/xdcar.html',
				link: function(scope, ele, attr) {
					//函数逻辑
				}
			}
		})
		//历史记录商品列表
	directives.directive('xdmore', ['$location','$http',function($location,$http) {
			return {
				templateUrl: 'directive/Tdetail/xdmore.html',
				link: function(scope, ele, attr) {
					//函数逻辑
					//发送ajax请求,获取页面所需数据
					function more(){
						var startnum = 1;
						$http({
							type:"get",
							url:"http://w.lefeng.com/api/neptune/handpick_list/v1",
							params:{
								stochastic:1,
								start:++startnum,								
							}
						}).then(function(res){
							console.log(res.data.data)
							scope.msg = res.data.data
						})
					};
					more();
				}
			}
		}])
		//返回顶部
	directives.directive('xdtop', function() {
			return {
				templateUrl: 'directive/Tdetail/xdtop.html',
				link: function(scope, ele, attr) {
					//函数逻辑
					$(window).on('scroll',function(){
						//获取窗口滚动高度
//						console.log($(window).scrollTop())
						if($(window).scrollTop()>500){
							$('.totop').addClass('active')
							$('.active').on('click',function(){
								$('body').animate({scrollTop:0});
								return false;
							})
							
						}else{
							$('.totop').removeClass('active')
						}
						
					})
					console.log($(window).scrollTop())
				}
			}
		})
		//遮罩层
	directives.directive('xmask', function() {
		return {
			templateUrl: 'directive/Tdetail/xmask.html',
			link: function(scope, ele, attr) {
				//函数逻辑
			}
		}
	})

	//buyCar..............................................................zhang

})();