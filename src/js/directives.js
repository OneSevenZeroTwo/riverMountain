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
	directives.directive('xempty', ['$window', function($window) {
		return {
			templateUrl: "directive/buycar/xempty.html",
			link: function(scope, ele, attr) {
				console.log("xempty加载")
				console.log(scope.goodlist)
				
				if(scope.cookie.length==0) {
					scope.showEmpty = true
				} else {
					scope.showEmpty = false
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
					tool.time(0.1)
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
	directives.directive('xbuycartotal', ['$window', '$rootScope',"tool", function($window, $rootScope,tool) {
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
//					console.log(res.data.data)
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