(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('formFilter', ['$timeout','$compile', function ($timeout,$compile){
            var temp = {};
            return {
                require: "?ngModel",
                scope: {
                    model: "=model",
                    me : '=ngModel',
                    ngChange : '&ngChange'
                },
                //template: ,
                link: function(scope, element, attributes, ngModel) {
                    scope.update = function()
                    {
                        scope.ngChange({item : temp[scope.me]});
                    };

                    var select = '<select-box class="'+ attributes.class + '" ng-model="me" ng-change="update()"';
                    if (scope.model.options){
                        select += 'options="{{ model.options }}"';
                    }
                    select += ' > ';
                    select += '<option value="">Select one</option>' +
                        '</select-box>';

                    var templates = {
                        text : '<input type="text" class="'+ attributes.class + '" ng-model="me" ng-change="update()" ' +
                        'placeholder="'+attributes.placeholder+'" />',
                        email : '<input type="email" class="'+ attributes.class + '" ng-model="me" ng-change="update()" ' +
                        'placeholder="'+attributes.placeholder+'" />',
                        select : select,
                        date : '<date class="'+ attributes.class + '" ng-model="me" ng-change="update()"></date>'
                    };

                    if (!templates[attributes.type]){
                        return '';
                    }

                    element.html(templates[attributes.type]);
                    var el = $compile(element.contents())(scope);

                    element.replaceWith(el);

/*                    scope.$watch("model", function(val) {
                        if (val){
                            scope.show = true;
                            $timeout(function(){
                                scope.show = false;
                            },time);
                        }
                    });*/
                }
            };
        }]);
})();