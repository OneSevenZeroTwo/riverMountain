;
(function() {
	var services = angular.module('services', [])

	services.service('tool', function($rootScope) {
		return {
			add: function(a, b) {
				return a + b
			},
			//封装点击购买保留20分钟cookie的购物商品的函数
//			username:用户名
//			gid:商品数量
//			bool:添加删除减少操作
//			 例子:tool.stayTwenty('aaa',222922944,"del")
			stayTwenty: function(username,gid,bool) {
				//把商品存进cookies中,商品id,数量[{"gid":222922944,"qty":2},{"gid":82116607,"qty":3}]
				var now = new Date()
				var settime = now.getMinutes()
				settime = now.setMinutes(settime + 20)
//				console.log(new Date(settime))

				var cookie = getCookie(username)
				cookie = cookie ? JSON.parse(cookie) : []
//				console.log(cookie)
				//如果是加数量或添加到购物车
				if(bool=='add'){
					//先添加进cookie中
					cookie.unshift({
						gid: gid,
						qty: 1
					})
					//再去重,重复的商品增加qty
					for(i = 1; i <= cookie.length - 1; i++) {
						if(cookie[0].gid == cookie[i].gid) {
							console.log(1111)
							cookie[i].qty++
								cookie.shift()
							break
						}
					}
//					console.log(JSON.stringify(cookie))
					//重新设置cookie
					setCookie(username, JSON.stringify(cookie), settime)
					
				}else if(bool=="reduce"){
					//数量减一
					$.each(cookie,function(i,items){
						if(gid == items.gid){
							items.qty--
							return false
						}
					})
//					console.log(JSON.stringify(cookie))
					setCookie(username, JSON.stringify(cookie), settime)
				}else if(bool=="del"){
					//点击删除整个商品
					$.each(cookie,function(i,items){

						if(gid == items.gid){
							cookie.splice(i,1)
							return false
						}
					})
//					console.log(JSON.stringify(cookie))
					setCookie(username, JSON.stringify(cookie), settime)
				}
			}

		}
	})
})();