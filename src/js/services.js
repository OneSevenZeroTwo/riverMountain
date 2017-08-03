;(function(){
	var services = angular.module('services',[])
	services.service('tool',function($rootScope){
		return{
			add:function(a,b){
				return a+b
			}
		
		}		
	})
})();