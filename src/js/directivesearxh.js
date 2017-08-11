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
				//底部刷新
				$(window).scroll(function(){                
			        var scrollh = $(document).height();  
			        var scrollTop=Math.max(document.documentElement.scrollTop||document.body.scrollTop);  
			        if((scrollTop + $(window).height()) >= scrollh){ 
			        	console.log('到底了')
			        	scope.page++ 
			        	scope.searchheadreq();
			        	scope.searchnogoodspage++
			        	scope.searchgoods()   
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
	directivesearch.directive('xsearchnogoods', ['$http', '$rootScope', function($http, $rootScope) {
		return {
			templateUrl: "directive/search/xsearchnogoods.html",
			link: function(scope, ele, attr) {
				scope.searchnogoodspage = 1;
				scope.searchnogoods = [];
				scope.searchgoods = function(){
					$http({
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/handpick_list/v1?stochastic=1&start="+scope.searchnogoodspage,
						params: {}
					}).then(function(data) {
						console.log(data)
						scope.searchnogoods = scope.searchnogoods.concat(data.data.data)
						console.log(scope.searchnogoods)
						// scope.isLoading = false;

					})
				}
				scope.searchgoods()
				
			}
		}
	}])
	// 购物车组件
	directivesearch.directive('xsearchcar', ['$rootScope','tool', function( $rootScope,tool) {
		return {
			templateUrl: "directive/search/xsearchcar.html",
			link: function(scope, ele, attr) {
				scope.searchallsum = 0;
				scope.searchcookie = getCookie("aaa") ? JSON.parse(getCookie("aaa")) : []
				console.log(scope.searchcookie)
				scope.searchtotal = function() {
					
					scope.searchcookie.forEach(function(items, i) {
						
						scope.searchallsum += items.qty
					})
				}
				scope.searchtotal()

				scope.searchbuy = function($event,gid) {
					scope.gid = gid
					
					tool.stayTwenty('aaa', scope.gid, "add")
					//生成图片
					var $cloneImg = $('<div></div>');
					var s_left = $($event.target).offset().left;
					var s_top = $($event.target).offset().top;
					var gid = $($event.target).parent().parent().parent().attr('id');

					console.log(gid)

					$cloneImg.css({
						position: 'absolute',
						left: s_left,
						top: s_top,
						width: 40,
						height: 40,
						'line-height': 40,
						'text-align': 'center',
						'border-radius': '50%',
						'background-repeat': 'no-repeat',
						'background-size': 'contain',
						'background-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAyVBMVEUAAAD/gar/hKr/hKz/gar/////hKz/gav/gKr/h63/m7b/gKv/gKv/gar/gav/jK//gKr/gKr/gqv/gqv/gKr/gKv/gav/gav/gqz/gqv/hKz/g63/hKz/i63/gar/gKr/gKv/gKv/gKv/gav/gqv/g6z/g6v/haz/hqz/trb/gqz/gar/gav/hLD/gqv/gKr/8/f/0uH/tc7/gqv/4+3/w9b/scv/ocD/mrv/kLT/ydv/6/L/6vH/3Of/2OT/vNL/qMX/krb/jLJiP+PHAAAAL3RSTlMASzY09gEm+/IZB4PTy2kO5N3Xwbezd29jWD8vHxTprZ2YkX5RRDoqIwPupoodX4kG7iAAAAInSURBVFjD7djZbuJAFATQMmCMbcK+DTthT0I6xIEEkln//6NGFwdpEFiuRj0vMz7PraLdt9QYkEgk/lN2NytWHsxx8yoU9AePRZhxq/6Q83swYahO9KcwoJM7TQ3GMKA3+SJa41omjPVhUnEc7roAoxY3EprJwqjiIbUKs3olSU3BLEtC72GYHEDOhlkF2WoaZs0ltJEipLseSEtH5q84FX8BSkUWK5bjU9utK6XuFK/mkZehozTcs+Pfrwn7519KtBFrKuvWT5T3V1lcR6yurNs8kd7kBoo/VVvu1S0bupctdLhOvbKh3yR0xnVqx4auydAH+apiQ79LaI/s1IvGoEow26kXtv0rjU5tZa0FmOzUV8ks2SDk2U597CS0CcaA7NT7m2Tml2A8yFpiSD9lnTMDpUV1ahMo0QKnHd+pj81O883LVTKp50jbH4fDpId07BSnb4GXpyKDYREaBkRkZpTFEd+pTKRcuXprneyS7hS9EZ1OPcKsoiMvCX/jfdJJg8YfasmFUV5ZUsuW4VEFSlT9iRWjA15TsYY6qQ6bugAvlSdDV9BgTwY5ItOHJtvtpGO4+GfNG6NmxGx7hdF4his0pFWZAi6w+jKj0RK6JuogaONM97MWjauuKlGL/I9I/5ex56jQHc5U1ae5bkePzS/jTO0Yqt3SevSN0Tj7PFY2Ez79hd14lXCGU2hLy5Vyc/HYXHmMkoUr2Fmriwiu1VkikUic+A0oSSO0LAB34wAAAABJRU5ErkJggg==)'
					}).appendTo('body');

					// 图片飞入动画效果
					// 动画完成后，把复制li写入购物车列表
					var e_left = $('._2je43mssPpq3rot5HNhUEl').offset().left;
					var e_top = $('._2je43mssPpq3rot5HNhUEl').offset().top;
					setTimeout(function() {
						$cloneImg.animate({
							left: e_left,
							top: e_top,
							width: 40,
							height: 40
						}, function() {

							// 删除动画图片
							$cloneImg.remove();
							$('.countdown-wrap').find('span').text()
							
						});
					}, 200)

					scope.searchallsum++
				}
			}
		}
	}])
})();