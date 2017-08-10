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
					scope.list1 = function(){
						location.href = "#!/brand/755041472"
					}
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
		directives.directive('xindexguanggao', function() {
			return {
				templateUrl: "directive/chuanyeIndex/xguanggao.html",
				link: function(scope, ele, attr) {

				}
			}

		})
		// 首页的列表页
		directives.directive('xindexlist', ['$state', '$http', '$window', function($state, $http, $window) {
			return {
				templateUrl: "directive/chuanyeIndex/xlist.html",
				link: function(scope, ele, attr) {
					//				首页列表页请求
					scope.arr = [];
					scope.page = 1;
					scope.isLoadMore = 0;
					//				封装ajax
					scope.shows = function() {

						$http({
							methods: 'get',
							url: 'https://w.lefeng.com/api/neptune/special_brands/v3?page=' + scope.page + '&labelType=1'
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
				}

			}
		}])
		// 首页的底部
		directives.directive('xindexfloor', function() {
			return {
				templateUrl: "directive/chuanyeIndex/xfloor.html",
				link: function(scope, ele, attr) {

				}
			}
		})
		// 回到顶部按钮
		directives.directive('xindextop', function() {

			return {
				templateUrl: "directive/chuanyeIndex/xtop.html",
				link: function(scope, ele, attr) {
					$(document).scroll(function() {
						console.log(222)
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
		})

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
					scope.ccc = ''

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
						url: 'https://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10'
					}).then(function(data) {
						console.log(data.data.data)
						scope.news = data.data.data

					})

					$(".keyword").bind('input propertychange', function() {
						scope.ccc = $(".keyword").val()
						console.log(scope.ccc)
						$http({
							methods: 'get',
							url: 'https://w.lefeng.com/api/neptune/search/suggestion/v1?keyword=' + scope.ccc + '&count=15'
						}).then(function(data) {
							scope.seel = data.data.data
							console.log(scope.seel)
						})
						if($('.keyword').val() === '') {
							$(".shou").hide()
							$(".qu").show()
						} else {
							$(".shou").show()
							$(".qu").hide()

						}
					})

					$('.jVmPCc8t9niUxq0aC4XcD').on('click', "dd", function() {
						$(".keyword").val($(this).html())
						$(".shou").show()
						$(".qu").hide()
					})
					$('._2zSykbfnp9HX1QFp7QarD5').on('click', "dd", function() {
						$(".keyword").val($(this).html())
						$(".shou").show()
						$(".qu").hide()
					})
					$('.shou').on('click', function() {
						console.log($('.keyword').val())
						$rootScope.keyword = $('.keyword').val()
						location.href = "#!/search/"+$rootScope.keyword
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

		// brand遮罩层组件
		directives.directive('xbrandmasklayer', ['$window', '$rootScope', function($window, $rootScope) {
			return {
				templateUrl: "directive/brand/xbrandmasklayer.html",
				link: function(scope, ele, attr) {

				}
			}
		}])
		// 头部组件
		directives.directive('xbrandheader', ['$http', '$rootScope', '$state', function($http, $rootScope, $state) {
			return {
				templateUrl: "directive/brand/xbrandheader.html",
				link: function(scope, ele, attr) {
					console.log($state)
					// scope.brandName = '';
					scope.brandId = $state.params.brandId
					console.log(scope.brandId)
					scope.brandheadreq = function() {
						$http({
							methods: "GET",
							url: "https://w.lefeng.com/api/neptune/brand/details/v1?brandId="+scope.brandId,
							params: {
								
							}
						}).then(function(data) {
							console.log(data)
							
							scope.brandName = data.data.data.brandName
							scope.brandHeadImg = data.data.data.brandHeadImg
							console.log(scope.brandName)
							console.log(scope.brandHeadImg)
						})
					}
					scope.brandheadreq()
					scope.home = function() {
						location.href = "#!/index"
					}
					scope.back = function() {
						history.back()
					}
				}
			}

		}])
		// brand筛选部分组件
		directives.directive('xbrandcenter', ['$http', '$rootScope', function($http, $rootScope) {
			return {
				templateUrl: "directive/brand/xbrandcenter.html",
				link: function(scope, ele, attr) {
					scope.page = 0;
					scope.sorts = '';
					scope.catName3 = '';
					//点击切换价格销量
					$('.sort').parent().on('click', function() {
						scope.page = 1;
						scope.goodslist = [];
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
							} else {
								scope.sorts = '{"sale":"desc"}'
								console.log(scope.sorts)
							}

						} else {
							console.log(555)
							$(this).children().addClass('asc').removeClass('desc')
							if($(this).hasClass('vipshopPrice')) {
								scope.sorts = '{"vipshopPrice":"asc"}'
								console.log(scope.sorts)
							} else {
								scope.sorts = '{"sale":"asc"}'
								console.log(scope.sorts)
							}
						}
						scope.brandcontentreq()

					})

					// 点击筛选出现
					$('i.filter').parent().on('click', function() {

						// 页面渲染前遮罩层出现
						scope.isLoading = true;
						$('._1u1iuEeNLuruAqLXg8xrdz').show();
						$('._1u1iuEeNLuruAqLXg8xrdz').addClass('show')
						$('.sort').removeClass('asc desc');
						$('body').css({overflow: 'hidden'})

						$http({
							methods: "GET",
							url: "http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1",
							params: {
								// page:page++
								brandId: scope.brandId
							}
						}).then(function(data) {
							console.log(data)
							scope.ddclass = data.data.data

							// 页面渲染后遮罩层隐藏
							scope.isLoading = false;

						})
					})
					
					// 点击筛选里面的确定隐藏
					$('._1u1iuEeNLuruAqLXg8xrdz').on('click', '.submit', function() {
						scope.page = 1;
						scope.goodslist = [];

						$('body').css({overflow: 'auto'})
						scope.isLoading = true;

						$('._1u1iuEeNLuruAqLXg8xrdz').hide();
						$('._1u1iuEeNLuruAqLXg8xrdz').removeClass('show')
						$http({
							methods: "GET",
							url: "http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=" + scope.brandId + "&sort=" + scope.sorts + "&start="+scope.page+"&catName3=" + scope.catName3,
							params: {}
						}).then(function(data) {
							console.log(data)
							scope.goodslist = data.data.data
							scope.isLoading = false;

						})
					})
					// 点击筛选里面的字元素
					$('.filterBody').on('click', 'dd', function() {
						$(this).addClass('checked').siblings().removeClass('checked');
						scope.catName3 = $(this).text();
						console.log(scope.catName3)

					})

					//点击筛选取消隐藏
					$('.header').on('click', '.cancel', function() {
						$('._1u1iuEeNLuruAqLXg8xrdz').hide();
						$('._1u1iuEeNLuruAqLXg8xrdz').removeClass('show')
						$('body').css({overflow: 'auto'})
					})
				}
			}

		}])
		// brand内容部分组件

	directives.directive('xbrandcontent', ['$http',"$rootScope",'tool','$state', function($http,$rootScope,tool,$state) {
			return {
				templateUrl: "directive/brand/xbrandcontent.html",
				link: function(scope, ele, attr) {
					console.log(ele)
					scope.page = 1;
					scope.goodslist = [];
					scope.isLoadMore = 0;
					scope.buy = function($event,gid) {
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

						scope.brandallsum++
					}

					scope.brandcontentreq = function() {
						console.log(scope.page)
						scope.isLoading = true;
						$http({
							methods: "GET",
							url:"http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=" + scope.brandId + "&start="+scope.page+"&sort=" + scope.sorts,
							// params:{
							// 	page:page++
							// }
						}).then(function(data) {
							console.log(data)
						
							scope.goodslist = scope.goodslist.concat(data.data.data)
							// 页面渲染后遮罩层隐藏
							scope.isLoading = false;
							scope.isLoadMore++;
						})
					}
					scope.brandcontentreq()
					
					$(window).scroll(function(){                
				        var scrollh = $(document).height();  
				        var scrollTop=Math.max(document.documentElement.scrollTop||document.body.scrollTop);  
				        if((scrollTop + $(window).height()) >= scrollh){ 
				        	console.log('到底了')
				        	scope.page++ 
				        	scope.brandcontentreq();   
				        } 
				    });

					scope.clearfix = function(e) {
						var id = $(e.target).closest('li').attr('id')
						location.href = '#!/detail/' + id
						console.log(id)
						
					}

				}
			}
		}])
	// 加入购物车部分组件
	directives.directive('xbrandcar', ['$window', 'tool', function($window, tool) {

			return {
				templateUrl: "directive/brand/xbrandcar.html",
				link: function(scope, ele, attr) {
					
					scope.brandallsum = 0;
					scope.brandcookie = getCookie("aaa") ? JSON.parse(getCookie("aaa")) : []
					
					scope.brandtotal = function() {
						
						scope.brandcookie.forEach(function(items, i) {
							
							scope.brandallsum += items.qty
						})
					}
					scope.brandtotal()
					
					scope.toButcar = function() {
						location.href = "#!/buycar"
						
					}
				}
			}
	}])
	// 底部部分组件
	directives.directive('xbrandfooter', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/brand/xbrandfooter.html",
			link: function(scope, ele, attr) {

			}
		}
	}])

	directives.directive('xempty', ['$window', function($window) {
		return {
			templateUrl: "directive/buycar/xempty.html",
			link: function(scope, ele, attr) {
				console.log("xempty加载")
				console.log(scope.goodlist)

				if(scope.cookie.length == 0) {
					scope.showEmpty = true
				} else {
					scope.showEmpty = false
				}

			}
		}
	}])

	// 点击回到顶部组件
	directives.directive('xbrandgotop', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/brand/xbrandgotop.html",
			link: function(scope, ele, attr) {
				$(document).scroll(function() {
					//					console.log(222)
					if($(document).scrollTop() > 200) {
						//				console.log(23322)
						$('._3qKxepJBXFjxj1GqSe_v_v').addClass('active');

					} else {
						$('._3qKxepJBXFjxj1GqSe_v_v').removeClass('active')

					}

				});
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

	//tang.................................................................detail页面
	//头部

	directives.directive('xdheader', ['$location', '$http', '$state', function($location, $http, $state) {
		return {
			templateUrl: 'directive/Tdetail/xdheader.html',

			link: function(scope, ele, attr) {
				scope.isLoadMore = 0;
				$('.left').on('click', function() {
					$('.adver').hide()
				});

				$('.icon-arrow-left').on('click', function() {
					window.history.go(-1);
				});
				$('.home').on('click', function() {
					location.href = '#!/index'
				});
				//发送ajax请求,获取页面所需数据
				(function() {
					//							console.log($state.params.id)
					//获取商品ID
					scope.gidnum = $state.params.id;
					scope.isLoadMore++;
					$http({
						type: "get",
						dataType: "json",
						url: "https://w.lefeng.com/api/neptune/goods/detail_with_stock/v1",
						params: {
							needBrandInfo: true,
							gid: scope.gidnum
						}
					}).then(function(res) {
						scope.msg = res.data.data
						scope.isLoadMore--;
						//								scope.spuNum = scope.msg.goods.vendorProductId;
						console.log(scope.msg)
						//								console.log(String(scope.spuNum))
					})
				})();
			}

		}

	}])
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
	directives.directive('xdsection2', ['$http', function($http) {

		return {
			templateUrl: 'directive/Tdetail/xdsection2.html',
			link: function(scope, ele, attr) {
				//函数逻辑
				//请求评论数据
				function getCom() {
					scope.isLoadMore++;
					console.log()
					$http({
						type: "get",
						url: "Json/pingjia.json",
					}).then(function(res) {
						console.log(res.data)
						scope.com = res.data;
						scope.aaaa = 3;
						scope.isLoadMore--;

					})
				}
				//自执行请求评论数据
				getCom();
				scope.pingjia = function() {
					location.href = "#!/common";
				}
			}
		}
	}])
	directives.directive('xpingjia', ['$http', function($http) {
		return {
			templateUrl: 'directive/Tdetail/xpingjia.html',
			link: function(scope, ele, attr) {
				//函数逻辑
				//请求评论数据
				function pingjia() {

					scope.isLoadMore++;
					console.log()
					$http({
						type: "get",
						url: "Json/pingjia.json",
					}).then(function(res) {
						console.log(res.data)
						scope.com = res.data;
						scope.isLoadMore--;
					})
				}
				pingjia()

			}
		}

	}])
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
	directives.directive('xdcar', ['tool', function(tool) {
		return {
			templateUrl: 'directive/Tdetail/xdcar.html',
			link: function(scope, ele, attr) {
				//函数逻辑
				scope.bycar = function() {
					tool.stayTwenty('aaa', scope.gidnum, "add")
					// location.href = "#!/buycar"
					

					$('.weui-skin_android').show().find('.weui-actionsheet__cell').text('加入购物车成功');
					setTimeout(function() {
						$('.weui-skin_android').hide();

					}, 1000)
					scope.detailallsum++
				};
				
				scope.detailallsum = 0;
				scope.detailcookie = getCookie("aaa") ? JSON.parse(getCookie("aaa")) : []
				
				scope.detailtotal = function() {
					
					scope.detailcookie.forEach(function(items, i) {
						
						scope.detailallsum += items.qty
					})
				}
				scope.detailtotal()
			}
		}
	}])
	//历史记录商品列表
	directives.directive('xdmore', ['$location', '$http', function($location, $http) {
			return {
				templateUrl: 'directive/Tdetail/xdmore.html',
				link: function(scope, ele, attr) {
					//函数逻辑
					scope.more = [];
					scope.startnum = 1;
					//发送ajax请求,获取页面所需数据
					function more() {
						scope.isLoadMore++;
						$http({
							type: "get",
							url: "https://w.lefeng.com/api/neptune/handpick_list/v1",
							params: {
								stochastic: 1,
								start: scope.startnum,
							}
						}).then(function(res) {
							//						console.log(res.data.data)
							scope.more = scope.more.concat(res.data.data);
							scope.isLoadMore--;
							console.log(scope.more)
						})
					};					
				
				more();
				$('#detailScroll').scroll(function() {

					if($(this).height() + $(this).scrollTop() >= this.scrollHeight) {
						console.log("到底了")
						scope.startnum++
							more();
					}
				})

				//点击商品进入详情页
				scope.etail = function(e) {
					//商品ID
					scope.gidnum = $(e.target).closest('li').attr('name');
					location.href = "#!/detail/" + scope.gidnum;
					window.location.reload()
				}

			}
		}
	}])
//返回顶部
directives.directive('xdtop', function() {
	return {
		templateUrl: 'directive/Tdetail/xdtop.html',
		link: function(scope, ele, attr) {
			//函数逻辑
			//					$('.top').addClass('active')
			$('#detailScroll').scroll(function() {
				console.log(222)
				if($('#detailScroll').scrollTop() > 100) {
					//				console.log(23322)
					$('.top').addClass('active');

				} else {
					$('.top').removeClass('active')

				}

			});
			$('.top').on('click', function() {
				console.log('11111')
				console.log($(window))
				$('#detailScroll').stop(true).animate({
					scrollTop: 0
				}, 500)
			})
			//					console.log($(document).scrollTop())
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

//头部
directives.directive('xbuycarheader', ['$window', function($window) {
	return {
		templateUrl: "directive/buycar/xbuycarheader.html",
		link: function(scope, ele, attr) {
			console.log("xbuycarheader加载")
			scope.buyback = function() {
				$window.history.back()
			}
		}
	}
}])

//购物车内容
directives.directive('xbuycontent', ['$window', '$http', 'tool', function($window, $http, tool) {
	return {
		templateUrl: "directive/buycar/xbuycontent.html",
		link: function(scope, ele, attr) {
			console.log("buycontent加载")
			//把商品存进cookies中,商品id,数量[{gid:222922944,qty:2},{gid:82116607,qty:3}]
			//调试
			//				tool.stayTwenty('aaa',222922944,"add")
			//				tool.stayTwenty('aaa',82116607,"add")
			//				tool.stayTwenty('aaa',170038981,"add")

			//				170038981
			//根据登录注册状态传入用户名
			scope.cookie = getCookie("aaa") ? JSON.parse(getCookie("aaa")) : []

			//				遍历cookie中的商品gid,ajax请求，渲染出商品
			scope.goodlist = []
			scope.toDetail = function(gid) {
				location.href = "#!/detail/" + gid
			}

			function getGood(gid, qty) {
				$http({
					url: "https://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true",
					params: {
						gid: gid
					}
				}).then(function(res) {
					//把数量添加进商品信息
					//						console.log(res.data.data.goods)
					res.data.data.goods.qty = res.data.data.goods ? qty : 1;
					scope.goodlist.push(res.data.data.goods)

					//进入页面自执行一次计算总价
					scope.total()
				})
			}
			scope.cookie.forEach(function(items, i) {
				getGood(items.gid, items.qty)
			})

			//点击减少数量
			scope.remove = function(e, gid) {
				console.log($(e.target).next().html())
				if($(e.target).next().html() == 1) {
					$(e.target).addClass('disabled')
					return
				}
				tool.stayTwenty('aaa', gid, "reduce")
				//改变goodlist中的qty，用于计算总价
				scope.goodlist.forEach(function(n) {
					if(n.gid == gid) {
						n.qty--
					}
				})
				$(e.target).next().html(function(i, oldval) {
					console.log(oldval)
					return --oldval
				})
				scope.total()
			}
			//点击增加数量
			scope.add = function(e, gid) {
				tool.stayTwenty('aaa', gid, "add")
				//改变goodlist中的qty，用于计算总价
				scope.goodlist.forEach(function(n) {
					if(n.gid == gid) {
						n.qty++
					}
				})
				$(e.target).prev().html(function(i, oldval) {

					$(e.target).prevAll('.icon-remove').removeClass('disabled')

					return ++oldval
				})
				scope.total()
			}

			//点商品击删除
			scope.del = function(e, gid) {
				$(e.target).closest('li').remove()
				tool.stayTwenty('aaa', gid, "del")
				//改变goodlist中的qty，用于计算总价
				scope.goodlist.forEach(function(n, i) {
					if(n.gid == gid) {
						scope.goodlist.splice(i, 1)
					}
				})
				scope.total()
				//判断如果购物车为空则显示empty组件
				if(scope.goodlist.length == 0) {
					scope.showEmpty = true
				} else {
					scope.showEmpty = false
				}

			}

			//商品合计
			scope.total = function() {
				//					console.log(scope.goodlist)
				scope.sum = 0
				scope.goodlist.forEach(function(items, i) {
					scope.sum += items.qty * items.vipshopPrice
				})
				tool.time(20)
				//					console.log(scope.sum)
			}

		}
	}

}])

//优惠券
directives.directive('xbuyyouhuiquan', ['$window', '$rootScope', function($window, $rootScope) {
	return {
		templateUrl: "directive/buycar/xbuyyouhuiquan.html",
		link: function(scope, ele, attr) {
			//				头部的图片
			console.log("buyCar加载")

			scope.name = 'buyCar'
		}
	}
}])

//结算部分
directives.directive('xbuycartotal', ['$window', '$rootScope', "tool", function($window, $rootScope, tool) {
	return {
		templateUrl: "directive/buycar/xbuycartotal.html",
		link: function(scope, ele, attr) {
			//				头部的图片
			console.log("buyCar加载")

			scope.name = 'buyCar'
			scope.toAddrss = function() {
				location.href = "#!/address"
			}

		}
	}

}])

//还有机会抢购
directives.directive('xelsebuy', ['tool', '$location', '$http', function(tool, $location, $http) {
	return {
		templateUrl: "directive/buycar/xelsebuy.html",
		link: function(scope, ele, attr) {
			console.log("elsebuy加载")
			scope.more = 5
			scope.elseArr = [1119452, 1078211, 852055, 1097323, 1065082, 1043796, 620615]
			$http({
				url: "https://w.lefeng.com/api/neptune/goods/list_with_stock/v1",
				params: {
					brandId: scope.elseArr[randomNum(0, scope.elseArr.length - 1)]
				}
			}).then(function(res) {

				console.log(res.data.data)

				scope.elesGoods = res.data.data
			})

			scope.moreFn = function() {
				scope.more = 10
			}

			scope.addBuyCar = function(gid) {
				tool.stayTwenty('aaa', gid, "add")
				//刷新页面重新加载cookie
				location.reload()
			}

		}

	}
}])

//填写地址
//头部
directives.directive("xaddressheader", ['$window', function($window) {
	return {
		templateUrl: "directive/address/xaddressheader.html",
		link: function(scope, ele, attr) {
			scope.back = function() {
				$window.history.back()
			}
			scope.home = function() {
				location.href = "#!/index"
			}
		}
	}
}])
//个人信息
directives.directive("ximformation", function() {
	return {
		templateUrl: "directive/address/ximformation.html",
		link: function(scope, ele, attr) {

		}
	}
})
//地址
directives.directive("xaddress", ['$http', function($http) {
return {
	templateUrl: "directive/address/xaddress.html",
	link: function(scope, ele, attr) {

		//省
		scope.getProvince = function() {
			$http({
				url: "https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1",
			}).then(function(res) {

				scope.province = res.data.data.list

			})
		}
		scope.getProvince()
		//选择省份后触发，请求城市
		scope.getCity = function() {
			console.log("Getcity")
			$http({
				url: "https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1",
				params: {
					areaId: scope.provinceId
				}
			}).then(function(res) {
				scope.city = res.data.data.list
				//						scope.street =[]
				//						scope.town =[]

			})

		}
		//选择城市后触发，请求区镇
		scope.getTown = function() {
			$http({
				url: "https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1",
				params: {
					areaId: scope.cityId
				}
			}).then(function(res) {
				scope.town = res.data.data.list

			})

		}
		//选择城市后触发，请求区镇
		scope.getStreet = function() {
			$http({
				url: "https://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1",
				params: {
					areaId: scope.townId
				}
			}).then(function(res) {
				scope.street = res.data.data.list

			})

		}
	}
}
}])
})();