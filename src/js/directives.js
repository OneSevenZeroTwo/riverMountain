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
					url: 'http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10'
				}).then(function(data) {
					console.log(data.data.data)
					scope.news = data.data.data

				})

				$(".keyword").bind('input propertychange', function() {
					scope.ccc = $(".keyword").val()
					console.log(scope.ccc)
					$http({
						methods: 'get',
						url: 'http://w.lefeng.com/api/neptune/search/suggestion/v1?keyword=' + scope.ccc + '&count=15'
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

				})
				$('._2zSykbfnp9HX1QFp7QarD5').on('click', "dd", function() {
					$(".keyword").val($(this).html())

				})
//				$('.shou').on('click',function(){
//					
//				})

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

	// 遮罩层组件
	directives.directive('xbrandmasklayer', ['$window', '$rootScope', function($window, $rootScope) {
		return {
			templateUrl: "directive/xbrandmasklayer.html",
			link: function(scope, ele, attr) {

			}
		}
	}])
	// 头部组件
	directives.directive('xbrandheader', ['$http', '$rootScope','$state', function($http, $rootScope,$state) {
		return {
			templateUrl: "directive/xbrandheader.html",
			link: function(scope, ele, attr) {
				console.log($state)
				scope.brandId = $state.params.brandId
				scope.brandheadreq = function() {
					$http({
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/brand/details/v1",
						params: {
							// page:page++
							brandId:scope.brandId
						}
					}).then(function(data) {
						console.log(data)
						scope.brandName = data.data.data.brandName
						scope.brandHeadImg = data.data.data.brandHeadImg

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
						if($(this).hasClass('vipshopPrice')) {
							console.log(666)
							scope.sorts = '{"vipshopPrice":"desc"}'
						} else {
							scope.sorts = '{"sale":"desc"}'
						}

					} else {
						console.log(555)
						$(this).children().addClass('asc').removeClass('desc')
						if($(this).hasClass('vipshopPrice')) {
							scope.sorts = '{"vipshopPrice":"asc"}'
						} else {
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
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1",
						params: {
							// page:page++
							brandId:scope.brandId
						}
					}).then(function(data) {
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
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+scope.brandId+"&sort='" + scope.sorts + "'&start=1&catName3=" + scope.catName3,
						params: {
						}
					}).then(function(data) {
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
	directives.directive('xbrandcontent', ['$http', 'tool', function($http, tool) {
		return {
			templateUrl: "directive/xbrandcontent.html",
			link: function(scope, ele, attr) {
				scope.page = 0;
				scope.goodslist = [];
				scope.buy=function(gid){
					scope.gid = gid
					tool.stayTwenty('aaa',scope.gid,"add")
				}
				scope.brandcontentreq = function() {
					$http({
						methods: "GET",
						url: "http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+scope.brandId+"&start=1&sort=" + scope.sorts,
						// params:{
						// 	page:page++
						// }
					}).then(function(data) {
						console.log(data)
						scope.goodslist = data.data.data

					})
				}
				scope.brandcontentreq()
			}
		}
	}])
	// 加入购物车部分组件
	directives.directive('xbrandcar', ['$window', 'tool', function($window, tool) {
		return {
			templateUrl: "directive/xbrandcar.html",
			link: function(scope, ele, attr) {
				scope.toButcar=function(){					
				location.href = "#!/buycar"
				}
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
			templateUrl: "directive/xbrandgotop.html",
			link: function(scope, ele, attr) {

			}
		}
	}])

	//tang.................................................................detail
	//头部广告部分
	directives.directive('xad', ['$location', '$http', function($location, $http) {
		return {
			templateUrl: 'directive/Tdetail/xad.html',
			link: function(scope, ele, attr) {
				$('.left').on('click', function() {
					console.log(555)
					$('.adver').hide()

				});
				//发送ajax请求,获取页面所需数据
				(function() {
					//获取商品ID
					console.log($location.url().slice(-8));
					var gidnum = $location.url().slice(-8);
					$http({
						type: "get",
						url: "http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1",
						params: {
							needBrandInfo: true,
							gid: gidnum

						}
					}).then(function(res) {
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
	directives.directive('xdsection2', function() {
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
	directives.directive('xdmore', ['$location', '$http', '$window', function($location, $http, $window) {
		return {
			templateUrl: 'directive/Tdetail/xdmore.html',
			link: function(scope, ele, attr) {
				//函数逻辑
				scope.more = [];
				//发送ajax请求,获取页面所需数据
				function more() {
					var startnum = 1;
					$http({
						type: "get",
						url: "http://w.lefeng.com/api/neptune/handpick_list/v1",
						params: {
							stochastic: 1,
							start: ++startnum,
						}
					}).then(function(res) {
						//						console.log(res.data.data)
						scope.more = scope.more.concat(res.data.data);
						console.log(scope.more)
					})
				};
				more();
				//				console.log($window.height)

			}
		}
	}])
	//返回顶部
	directives.directive('xdtop', function() {
		return {
			templateUrl: 'directive/Tdetail/xdtop.html',
			link: function(scope, ele, attr) {
				//函数逻辑
				$(window).on('scroll', function() {
					//获取窗口滚动高度
					//						console.log($(window).scrollTop())
					if($(window).scrollTop() > 500) {
						$('.totop').addClass('active')
						$('.active').on('click', function() {
							$('body').animate({
								scrollTop: 0
							});
							return false;
						})

					} else {
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

				function getGood(gid, qty) {
					$http({
						url: "http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true",
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
					url: "http://w.lefeng.com/api/neptune/goods/list_with_stock/v1",
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
						url: "http://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1",
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
						url: "http://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1",
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
						url: "http://w-ssl.lefeng.com/api/neptune/address/getAddressFullInfoByCode/v1",
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