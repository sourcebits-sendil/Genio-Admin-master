app.directive('resize', ['$window',function ($window) {
	return function (scope, element) {
		var w = $window;
		scope.getWindowDimensions = function () {
			return { 'h': w.innerHeight};//, 'w': w.width() };
		};
		scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
				scope.windowHeight = newValue.h;
           // scope.windowWidth = newValue.w;
            
            scope.style = function () {
				return { 
                    'height': (newValue.h - 40) + 'px',
                    //'width': (newValue.w - 100) + 'px' 
                };
			};
            
		}, true);
	
	 $(window).bind('resize', function () {
			scope.$apply();
		});
	}
}])