(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('selectBox', ['$timeout','$compile', function ($timeout,$compile){
            return {
                require: "?ngModel",
                scope: {
                    model : "=ngModel"
                },
                link: function(scope, element, attributes, ngModel) {
                    scope.options = attributes.options || "o.v as o.n for o in [{ n: 'No', v: false }, { n: 'Yes', v: true }]";

                    var className = (attributes.class) ? 'class="'+attributes.class+'"' : '';
                    var template = '<select ng-model="model" ng-options="{{ options }}" '+ className + '>';
                    template += element.html();
                    template += '</select>';


                    element.html(template);
                    var el = $compile(element.contents())(scope);
                    element.replaceWith(el);
                 }
            };
        }]);
})();