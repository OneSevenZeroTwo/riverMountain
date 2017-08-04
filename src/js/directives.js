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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//liang..................................................................list
	// 遮罩层组件
	directives.directive('xbrandmasklayer', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/xbrandmasklayer.html",
			link: function(scope, ele, attr) {
				
			}
		}
	}])
	// 头部组件
	directives.directive('xbrandheader', ['$http', '$rootScope', function($http, $rootScope) {
		return {
			templateUrl: "directive/xbrandheader.html",
			link: function(scope, ele, attr) {
				scope.brandheadreq = function(){
					$http({
						methods:"GET",
						url:"http://w.lefeng.com/api/neptune/brand/details/v1?brandId=755041472",
						params:{
							// page:page++
						}
					}).then(function(data){
						console.log(data)
						scope.brandName = data.data.data.brandName
						scope.brandHeadImg = data.data.data.brandHeadImg
						
					})
				}
				scope.brandheadreq()
			}
		}
	}])
	// 中间部分组件
	directives.directive('xbrandcenter', ['$http', '$rootScope', function($http, $rootScope) {
		return {
			templateUrl: "directive/xbrandcenter.html",
			link: function(scope, ele, attr) {
				scope.page = 0;
				scope.sorts = '';
				scope.catName3 = '';
				//点击切换价格销量
				$('.sort').parent().on('click', function() {
					$(this).addClass('sorted').siblings().removeClass('sorted');
					$(this).siblings().children().removeClass('asc desc')
					if($(this).children().hasClass('asc')) {
						$(this).children().addClass('desc')
						$(this).children().removeClass('asc')
						console.log($(this).text() == "价格")
						if($(this).hasClass('vipshopPrice')){
							console.log(666)
							scope.sorts = '{"vipshopPrice":"desc"}'
						}else{
							scope.sorts = '{"sale":"desc"}'
						}
	
					} else {
						console.log(555)
						$(this).children().addClass('asc').removeClass('desc')
						if($(this).hasClass('vipshopPrice')){
							scope.sorts = '{"vipshopPrice":"asc"}'
						}else{
							scope.sorts = '{"sale":"asc"}'
						}
			
					}
					scope.brandcontentreq()
				})

				// 点击筛选出现
				$('i.filter').parent().on('click', function() {
					$('._1u1iuEeNLuruAqLXg8xrdz').show();
					$('.sort').removeClass('asc desc');
					$http({
						methods:"GET",
						url:"http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?brandId=755041472",
						params:{
							// page:page++
						}
					}).then(function(data){
						console.log(data)
						scope.ddclass = data.data.data
						
					})
				})
				// 点击筛选里面的字元素
				$('.filterBody').on('click', 'dd', function() {
					$(this).addClass('checked').siblings().removeClass('checked');
					scope.catName3 = $(this).text();

				})
				// 点击筛选隐藏
				// http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041472&start=1&catName3=%E9%9D%A2%E8%86%9C
				$('._1u1iuEeNLuruAqLXg8xrdz').on('click', '.submit', function() {
					$('._1u1iuEeNLuruAqLXg8xrdz').hide();
					$http({
						methods:"GET",
						url:"http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041472&&sort='"+scope.sorts+"'&start=1&catName3="+scope.catName3,
						params:{
							
						}
					}).then(function(data){
						console.log(data)
						scope.goodslist = data.data.data
						
					})
				})

				//点击筛选隐藏
				$('.header').on('click', '.cancel', function() {
					$('._1u1iuEeNLuruAqLXg8xrdz').hide();
				})
			}
		}
	}])
	// 内容部分组件
	directives.directive('xbrandcontent', ['$http', '$rootScope', function($http, $rootScope) {
		return {
			templateUrl: "directive/xbrandcontent.html",
			link: function(scope, ele, attr) {
				scope.page = 0;
				scope.goodslist = [];
				scope.brandcontentreq = function(){
					$http({
						methods:"GET",
						url:"http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041472&start=1&sort="+scope.sorts,
						// params:{
						// 	page:page++
						// }
					}).then(function(data){
						console.log(data)
						scope.goodslist = data.data.data
						
					})
				}
				scope.brandcontentreq()
			}
		}
	}])
	// 加入购物车部分组件
	directives.directive('xbrandcar', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/xbrandcar.html",
			link: function(scope, ele, attr) {
				
			}
		}
	}])
	// 底部部分组件
	directives.directive('xbrandfooter', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/xbrandfooter.html",
			link: function(scope, ele, attr) {
				
			}
		}
	}])
	// 点击回到顶部组件
	directives.directive('xbrandgotop', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/xbrandgotop.html",
			link: function(scope, ele, attr) {
				
			}
		}
	}])
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//tang.................................................................detail
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//buyCar..............................................................zhang
	

})();