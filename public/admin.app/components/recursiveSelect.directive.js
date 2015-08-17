(function(){
    'use strict';


    angular.module('mcms.core')
        .directive('recursiveSelect', ['lodashFactory','$compile','$timeout','$parse', function (lo,$compile,$timeout,$parse){
            var Options = {
                label : 'title',
                value : '_id',
                childArr : 'children',
                emptyOption : '<option value="">Select one</option>',
                multiple : false
            };

            function flattenTree(tree,depth,arr){
                depth = depth || 1;
                var ret = arr || [];
                var label = '',
                    level = lo.clone(depth);
                while(level > 0) {
                    label = label + '-- ';
                    level--;
                }

                for (var i in tree){
                    tree[i].label = label + ' ' + tree[i][Options.label];
                    ret.push(tree[i]);
                    if (tree[i][Options.childArr] && tree[i][Options.childArr].length > 0){
                        flattenTree(tree[i][Options.childArr],depth+1,ret);
                    }

                }

                return ret;
            }
            var temp = {};
            return {
                require: "?ngModel",
                restrict : 'E',
                scope: {
                    tree: "=tree",
                    options : "=settings",
                    model : '=ngModel',
                    ngChange : '&ngChange'
                },
                link : {
                    pre: function (scope, element, attrs) {
                        lo.merge(Options,scope.options);
                    },
                    post : function(scope, element, attributes,ngModel) {
                        scope.update = function()
                        {
                            scope.ngChange({item : temp[scope.model]});
                        };

                        scope.$watch("tree", function(val) {
                            if (!val){
                                return;
                            }
                            scope.toRender = flattenTree(val);
                            for (var i in scope.toRender) {
                                temp[scope.toRender[i][Options.value]] = scope.toRender[i];
                            }

                            var className = (attributes.class) ? 'class="' + attributes.class + '"' : '',
                                emptyOption = Options.emptyOption || '',
                                multiple = (Options.multiple) ? 'multiple' : '';
                            var html = '<select ng-options="option.' + Options.value +
                                ' as option.label for option in toRender" ' +
                                'ng-model="model"' + className + ' ' + multiple
                                + ' ng-change="update()" >' + emptyOption + '</select>';

                            element.html(html);
                            var el = $compile(element.contents())(scope);
                            element.replaceWith(el);


                        });
                    }
                }
            };
        }]);
})();