(function(){
    'use strict';

    angular.module('mcms.core')
        .factory('lodashFactory',lodashFactory)
        .factory('momentFactory',momentFactory)
        .factory('pageTitle',pageTitle)
        .factory('queryString',QS);

    pageTitle.$inject = ['$rootScope','$timeout'];
    QS.$inject = ['$location','lodashFactory'];

    function lodashFactory(){
        return window._;
    }

    function momentFactory(){
        return window.moment;
    }

    function pageTitle($rootScope,$timeout){
        return {
            title : '',
            set : function(title){
                this.title = title;
                //wait for the DOM basically
                $timeout(function(){
                    $rootScope.$broadcast('set.pageTitle',title);
                });

            },
            get : function() {
                return this.title;
            }
        };

    }

    function QS($location,lodash){

        return {
            setupFiltersFromQueryString : function(filters){
                var params = $location.search();
                lodash.each(params,function(value,key){
                    if (typeof filters[key] != 'undefined'){
                        filters[key].value = value;
                    }
                });

                return filters;
            },
            setupQueryString : function(filters,include) {
                var params = {},
                    QS = $location.search(),
                    Query = {};

                for (var a in filters){
                    if (filters[a].value){
                        Query[a] = filters[a].value;
                    }
                }

                if (include) {
                    Query = lodash.merge(include,Query);
                }

                $location.search(Query);
                return Query;
            }
        };
    }
})();