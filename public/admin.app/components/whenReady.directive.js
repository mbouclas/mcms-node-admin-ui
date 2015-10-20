angular.module('mcms.core')
    .directive('whenReady', ['$interpolate','$rootScope', function($interpolate,$rootScope) {
    return {
        restrict: 'A',
        priority: Number.MIN_SAFE_INTEGER, // execute last, after all other directives if any.
        link: function($scope, $element, $attributes) {
            var waitForInterpolation = false;
            var hasReadyCheckExpression = false;

            if ($attributes.waitForInterpolation && $scope.$eval($attributes.waitForInterpolation)) {
                waitForInterpolation = true;
            }

            if ($attributes.readyCheck) {
                hasReadyCheckExpression = true;
            }

            if (waitForInterpolation || hasReadyCheckExpression) {
                requestAnimationFrame(function checkIfReady() {
                    var isInterpolated = false;
                    var isReadyCheckTrue = false;

                    if (waitForInterpolation && $element.text().indexOf($interpolate.startSymbol()) >= 0) { // if the text still has {{placeholders}}
                        isInterpolated = false;
                    }
                    else {
                        isInterpolated = true;
                    }

                    if (hasReadyCheckExpression && !$scope.$eval($attributes.readyCheck)) { // if the ready check expression returns false
                        isReadyCheckTrue = false;
                    }
                    else {
                        isReadyCheckTrue = true;
                    }

                    if (isInterpolated && isReadyCheckTrue) {
                        console.log('REAAAADY')
                        $rootScope.$broadcast('module.initialised',$attributes.whenReady || 'app');
                    }
                    else { requestAnimationFrame(checkIfReady); }

                });
            }
            else {
                console.log('REAAAADY')
            }
        }
    };
}]);