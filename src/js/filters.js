;
(function() {
	//测试
	var filters = angular.module('filters', [])
	filters.filter('s', function() {
		return function(input) {
			return input + 's'
		}
	})
	//过滤插入的html使其变为安全格式
	filters.filter('html', ['$sce', function($sce) {
		return function(input) {
			return $sce.trustAsHtml(input)
		}
	}])
	//过滤tab，输出对应的中文
	filters.filter('channel', function() {
		return function(input,good,top) {
			switch(input) {
				case "share":
					if(good&&top) {
						return `<span class="bg">分享</span>
						<span class="bg" style="color:#fff;background:green;">精华</span>
						<span class="bg" style="color:#fff;background:#e25454;">置顶</span>`;
						break;												
					}else if(good && !top){
						return `<span class="bg">分享</span>
						<span class="bg" style="color:#fff;background:green;">精华</span>`;
						break;
					} else if(!good && top){
						return `<span class="bg">分享</span>
						<span class="bg" style="color:#fff;background:#e25454;">置顶</span>`;
						break;
					}else {
						return `<span class="bg">分享</span>`;
						break;
					}
				case "job":
					return `<span class="bg">招聘</span>`;
					break;
				case "ask":
					return `<span class="bg" >问答</span>`;
					break;
				default:
					return ""
			}
		}
	})
	
	//控制标题长度多过滤器。
	filters.filter('ellipsis', ['$filter', function($filter) {
		return function(input) {
			if(input.length > 20) {
				return $filter("limitTo")(input, 18, 0) + "..."
			} else {
				return input
			}
		}
	}])

	//回复时间过滤成几天前回复。倒计时原理
	filters.filter('lastReplyTime', ['$filter', function($filter) {
		return function(input) {
			var now = Date.now()
			var reply = Date.parse(input)
			var intDiff =(now - reply)/1000;
			
			var year = Math.floor(intDiff  /  (60  *  60  *  24 * 30 * 12));
			var month = Math.floor(intDiff  /  (60  *  60  *  24 * 30));
			var day  =  Math.floor(intDiff  /  (60  *  60  *  24));        
			var hour  =  Math.floor(intDiff  /  (60  *  60))  -  (day  *  24);        
			var minute  =  Math.floor(intDiff  /  60)  -  (day  *  24  *  60)  -  (hour  *  60);        
			var second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			if(year>0){
				return year+'年前'
			}else if(month>0){
				return month+'月前'				
			}else if(day>0){
				return day+'天前'				
			}else if(hour>0){
				return hour+'小时前'				
			}else if(minute>0){
				return minute+'分钟前'				
			}else if(second>0){
				return second+'秒前'				
			}
		}
	}])

})();