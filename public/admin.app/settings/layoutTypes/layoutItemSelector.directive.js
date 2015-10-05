(function() {
    angular.module('mcms.settings')
        .directive('layoutItemSelector', layoutItemSelector);

    layoutItemSelector.$inject = ['$compile','configuration','$location','$rootScope','$templateRequest','$timeout'];
    layoutItemSelectorController.$inject = ['$location','$scope','$timeout','$rootScope','lodashFactory','configuration'];

    function layoutItemSelector($compile,Config,$location,$rootScope,$templateRequest,$timeout) {
        return {
            controller: layoutItemSelectorController,
            scope : {
                item : '=item'
            },
            restrict : 'E',
            controllerAs: 'VM',
            link: function(scope, element, attributes) {

                $templateRequest(Config.appUrl + 'settings/layoutTypes/' + scope.item.type + '.type.html').then(function(html){
                    element.html(html);

                    var el = $compile(element.contents())(scope);
                    $timeout(function(){
                        element.replaceWith(el);
                    });
                });

            }
        };
    }

    function layoutItemSelectorController($location,$scope,$timeout,$rootScope,lo,Config){
        var vm = this;
        vm.Item = $scope.item;
        vm.uploadConfig = {
            url : Config.apiUrl + 'uploadFrontPageImage',
            fields : {

            }
        };

        vm.onUploadDone = function(file,response){
            //Handle what happens after an upload is done
            //console.log(file,response);
        }
    }
})();