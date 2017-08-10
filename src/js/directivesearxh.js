;(function(){
	var directivesearch = angular.module('directivesearch', [])
	// 头部
	directivesearch.directive('xsearchheader', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/search/xsearchheader.html",
			link: function(scope, ele, attr) {
				// 回到首页
				scope.searchindex = function() {
					// console.log($(e.target))
					// var id = $(e.target).closest('li').attr('id')
					location.href = '#!/index'
					console.log(666)
					// console.log(this)
				}
				
				$(".keyword").bind('input propertychange', function() {
					scope.keyword = $(".keyword").val()
					
					console.log(scope.ccc)	
				})

				scope.searchheader = function(){
					scope.searchgoodslist = [];
					scope.keyword = $(".keyword").val()
					scope.searchheadreq()
				}
			}
		}
	}])
	// 中间筛选栏
	directivesearch.directive('xsearchselect', ['$http', '$rootScope','$state', function($http, $rootScope,$state) {
		return {
			templateUrl: "directive/search/xsearchselect.html",
			link: function(scope, ele, attr) {
				scope.sorts = '';
				scope.catName3 = '';
				scope.keyword = $state.params.keyword
				
				//点击切换价格销量
				$('.sort').parent().on('click', function() {
					scope.page = 1;
					scope.searchgoodslist = [];
					
					// 页面渲染前遮罩层出现
					scope.isLoading = true;
					$(this).addClass('sorted').siblings().removeClass('sorted');
					$(this).siblings().children().removeClass('asc desc')
					if($(this).children().hasClass('asc')) {
						$(this).children().addClass('desc')
						$(this).children().removeClass('asc')
						console.log($(this).text() == "价格")
						if($(this).hasClass('vipshopPrice')) {
							
							scope.sorts = '{"vipshopPrice":"desc"}'
							console.log(scope.sorts)
							console.log(666)
						} else {
							scope.sorts = '{"sale":"desc"}'
							console.log(scope.sorts)
							console.log(777)
						}

					} else {
						console.log(555)
						$(this).children().addClass('asc').removeClass('desc')
						if($(this).hasClass('vipshopPrice')) {
							scope.sorts = '{"vipshopPrice":"asc"}'
							console.log(scope.sorts)
							console.log(888)
						} else {
							scope.sorts = '{"sale":"asc"}'
							console.log(scope.sorts)
							console.log(999)
						}
					}
					scope.searchheadreq()

				})

				// 点击筛选里面的字元素
				$('.filterBody').on('click', 'dd', function() {
					$(this).addClass('checked').siblings().removeClass('checked');
					scope.catName3 = $(this).text();
					console.log(scope.catName3)

				})

				// 点击筛选出现
				$('i.filter').parent().on('click', function() {
					
					// 页面渲染前遮罩层出现
					$('body').css({overflow: 'hidden'})
					scope.isLoading = true;
					$('._1u1iuEeNLuruAqLXg8xrdz').show();
					$('._1u1iuEeNLuruAqLXg8xrdz').addClass('show')
					$('.sort').removeClass('asc desc');
					$http({
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?keyword="+$state.params.keyword,
						params: {
							// page:page++
							brandId: scope.brandId
						}
					}).then(function(data) {
						console.log(data)
						console.log(data.data.data)
						scope.searchclass = data.data.data

						// 页面渲染后遮罩层隐藏
						scope.isLoading = false;

					})
				})
				//点击筛选取消隐藏
				$('.header').on('click', '.cancel', function() {
					$('._1u1iuEeNLuruAqLXg8xrdz').hide();
					$('._1u1iuEeNLuruAqLXg8xrdz').removeClass('show')
					$('body').css({overflow: 'auto'})
				})

				// 点击筛选里面的确定隐藏
				console.log($rootScope.keyword)
				console.log(scope.catName3)
				console.log(scope.brandId)
				
				$('._1u1iuEeNLuruAqLXg8xrdz').on('click', '.submit', function() {
					scope.page = 1;
					scope.searchgoodslist = [];
					$('body').css({overflow: 'auto'})
					scope.isLoading = true;
					$('._1u1iuEeNLuruAqLXg8xrdz').hide();
					$('._1u1iuEeNLuruAqLXg8xrdz').removeClass('show')
					$http({
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+scope.keyword+"&catName3="+scope.catName3+"&page=1",
						params: {}
					}).then(function(data) {
						console.log(data)
						scope.searchgoodslist = data.data.data
						scope.isLoading = false;

					})
				})
			}
		}
	}])
	// 中间内容部分
	directivesearch.directive('xsearchcontent', ['$http', '$rootScope','$state', function($http, $rootScope,$state) {
		return {
			templateUrl: "directive/search/xsearchcontent.html",
			link: function(scope, ele, attr) {
				console.log($state.params.keyword)
				scope.keyword = $state.params.keyword
				scope.searchgoodslist = [];
				scope.page = 1;
				scope.isLoading = true;
				scope.goods = false;
				scope.searchheadreq = function() {
					scope.isLoading = true;
					$http({
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+scope.keyword+"&sort="+scope.sorts+"&page="+scope.page,
						params: {
							
						}
					}).then(function(data) {
						console.log(data)
						console.log(data.data.data)
						if(data.data.data.length == 0){
							scope.goods = true;
						}else{
							scope.searchgoodslist = scope.searchgoodslist.concat(data.data.data)
							scope.goods = false;
						}
						
						console.log(scope.searchgoodslist)
						// console.log(scope.searchgoodslist.length)
						
						scope.isLoading = false;
					})
				}
				scope.searchheadreq()
				
				$(window).scroll(function(){                
			        var scrollh = $(document).height();  
			        var scrollTop=Math.max(document.documentElement.scrollTop||document.body.scrollTop);  
			        if((scrollTop + $(window).height()) >= scrollh){ 
			        	console.log('到底了')
			        	scope.page++ 
			        	scope.searchheadreq();   
			        }
			        if($(window).scrollTop() >= 300){
							
						$('._3qKxepJBXFjxj1GqSe_v_v').addClass('active');

					} else {
						$('._3qKxepJBXFjxj1GqSe_v_v').removeClass('active')

					}  
			    }); 
				// 去到详情页
				scope.searchclearfix = function(e) {
					console.log($(e.target))
					var id = $(e.target).closest('li').attr('id')
					location.href = '#!/detail/' + id
					console.log(id)
					// console.log(this)
				}
			}
		}
	}])
	// search遮罩层组件
	directivesearch.directive('xsearchmasklayer', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/brand/xsearchmasklayer.html",
			link: function(scope, ele, attr) {

			}
		}
	}])
	// 回到顶部组件
	directivesearch.directive('xsearchgotop', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/search/xsearchgotop.html",
			link: function(scope, ele, attr) {
				
				//按钮top
				$('._3qKxepJBXFjxj1GqSe_v_v').on('click', function() {
					console.log('11111')
					$('body,html').stop(true).animate({
						scrollTop: 0
					}, 500)
				})
			}
		}
	}])
	// 找不到搜索的商品组件
	directivesearch.directive('xsearchnogoods', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/search/xsearchnogoods.html",
			link: function(scope, ele, attr) {

			}
		}
	}])
})();