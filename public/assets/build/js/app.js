(function(){
    'use strict';
    angular.module("mcms.namedRoutes", []).provider("$NamedRouteService", [
        "$locationProvider", function($locationProvider) {
            var Routes = [];
            this.$get = [
                '$rootScope', '$route', '$location', '$log', function($rootScope, $route, $location, $log) {
                    var prefix, routeService, type;
                    prefix = !$locationProvider.html5Mode().enabled ? "#" + $locationProvider.hashPrefix() : "";

                    type = function(obj) {
                        var classToType;
                        if (obj === void 0 || obj === null) {
                            return String(obj);
                        }
                        classToType = {
                            '[object Boolean]': 'boolean',
                            '[object Number]': 'number',
                            '[object String]': 'string',
                            '[object Function]': 'function',
                            '[object Array]': 'array',
                            '[object Date]': 'date',
                            '[object RegExp]': 'regexp',
                            '[object Object]': 'object'
                        };

                        return classToType[Object.prototype.toString.call(obj)];
                    };
                    return routeService = {
                        reverse: function(routeName, options) {
                            var routes;
                            routes = routeService.match(routeName);
                            if (routes.length === 1) {
                                return routeService.resolve(routes[0], options);
                            } else if (routes.length === 0) {
                                throw new Error('Route ' + routeName + ' not found');
                            }
                            throw new Error('Multiple routes matching ' + routeName + ' were found');
                        },
                        match: function(routeName) {
                            var routes;
                            routes = [];
                            angular.forEach($route.routes, function(config, route) {
                                if (config.name === routeName) {
                                    return routes.push(route);
                                }
                            });
                            return routes;
                        },
                        resolve: function(route, options) {
                            var count, pattern;
                            pattern = /(\:\w+)/g;
                            if (route === void 0) {
                                throw new Error("Can't resolve undefined into a route");
                            }
                            count = 0;
                            return prefix + route.replace(pattern, function() {
                                    var match, offset, output;
                                    match = arguments[0], offset = arguments[arguments.length - 1];
                                    if (type(options) === 'array') {
                                        output = options[count];
                                        count++;
                                        return output;
                                    } else if (type(options) === 'object') {
                                        return options[match.slice(1)];
                                    }
                                });
                        }
                    };
                }
            ];
            return this;
        }
    ]).directive('namedRoute', [
        '$log', '$NamedRouteService', function($log, $NamedRouteService) {
            return {
                restrict: "AC",
                link: function(scope, element, attributes) {
                    var attribute, newKey, options, url;
                    options = {};
                    for (attribute in attributes) {
                        if (!(attribute.indexOf('kwarg') === 0)) {
                            continue;
                        }
                        newKey = attribute.slice(5);
                        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
                        options[newKey] = attributes[attribute];
                    }
                    if (attributes.args != null) {
                        options = attributes.args.replace(/[\[\]\"\'\s]+/g, '').split(",");
                    }
                    url = $NamedRouteService.reverse(attributes.namedRoute, options);

                    return element.attr('href', url);
                }
            };
        }
    ]).filter('route', [
        '$route', '$NamedRouteService', function($route, $NamedRouteService) {
            return function(name, options) {
                return $NamedRouteService.reverse(name, options);
            };
        }
    ]);


})();
(function(){
  'use strict';

  var extraModules = [];
  for (var a in adminModules){
    var length = adminModules[a].modules.length || 0;
    for (var i =0;length > i;i++){
      extraModules.push(adminModules[a].modules[i]);
    }
  }

  var angularModules = [
      'ngRoute',
      'ngSanitize',
      'ngMessages',
      'formly',
      'ngFileUpload',
      'formlyBootstrap',
      'angular-redactor',
      'mcms.namedRoutes',
      'mcms.core',
      'mcms.dashboard',
      'mcms.users'
  ];


  angularModules = angularModules.concat(extraModules);

  angular.module('mcms', angularModules)
      .config(mcmsAdministratorConfig);

    mcmsAdministratorConfig.$inject = ['$routeProvider','configuration','$locationProvider','redactorOptions'];

    function mcmsAdministratorConfig($routeProvider,configuration,$locationProvider,redactorOptions) {
        configuration.CSRF = CSRF || '';
        //redactorOptions.buttons = ['formatting', '|', 'bold', 'italic'];
        $locationProvider
            .html5Mode(false);
        $routeProvider
            .when('/', {
                templateUrl: configuration.appUrl + 'dashboard/dashboard.html',
                controller: 'dashboardCtrl',
                controllerAs: 'Dashboard',
                name : 'app-home'
            })
            .otherwise('/');
    }
})();


(function(){
    'use strict';
    /*
    * Module used for core components like data services, lodash and common directives
    */
    angular.module('mcms.core',[]);
})();
(function(){
    'use strict';

    var core = angular.module('mcms.core');
    var assetsUrl = '/assets/',
        appUrl = '/admin.app/',
        componentsUrl = appUrl + 'components/';
    var config = {
        apiUrl : '/admin/api/',
        imageBasePath: assetsUrl + 'img',
        appUrl : appUrl,
        componentsUrl : componentsUrl
    };

    core.value('config', config);
    core.constant('configuration',config);
})();

(function(){
    'use strict';

    angular.module('mcms.core')
        .service('logger',logger);

    logger.$inject = ['$log'];

    function logger($log) {
        return {
            info : info,
            error : error,
            success : success,
            warning : warning,
            log     : $log.log
        };


        function info(message,data){
            $log.info('Info : ' + message,data || '');
        }

        function error(message,data){
            $log.error('Error : ' + message,data || '');
        }

        function success(message,data){
            $log.success('Success : ' + message,data || '');
        }

        function warning(message,data){
            $log.warning('Warning : ' + message,data || '');
        }
    }
})();
(function(){
    'use strict';

    angular.module('mcms.core')
        .factory('lodashFactory',lodashFactory)
        .factory('momentFactory',momentFactory)
        .factory('slugFactory',slugFactory)
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

    function slugFactory(){
        return window.slug;
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
(function(){
    angular.module('mcms')
        .controller('mainCtrl',mainCtrl);

    function mainCtrl(){

    }
})();
(function(){
    'use strict';

    angular.module('mcms.core')
        .service('core.dataService',dataService);

    dataService.$inject = ['$q','$timeout','$http','logger','$location','configuration','lodashFactory'];



    function dataService($q, $timeout, $http, logger, $location, constants,lo){
        var defaults = {
            apiUrl : constants.apiUrl,
            test : 1
        };

        function Service(options){
            options = options || {};
            this.options = {
                apiUrl : constants.apiUrl
            };

            lo.merge(this.options,options);
        }

        Service.prototype.responseSuccess = function(response) {
            return response.data;

        };

        Service.prototype.responseError = function(response) {
            var message = {};
            if (response.data && typeof response.data.error != 'undefined'){
                message.error = response.data.error;
            } else {
                message.error  = 'Error detected. (HTTP status: ' + response.status + ')';
            }
            message.data = response.data;
            message.status = response.status;
            return $q.reject(message);
        };

        Service.prototype.Post = function(endPoint,options){
            if (!options){
                options = {};
            }

            var deferred = $q.defer();
            options._csrf = constants.CSRF;
            return $http.post(this.options.apiUrl + endPoint,options);
        };

        Service.prototype.Get = function(endPoint,options){
            if (!options){
                options = {};
            }
            var deferred = $q.defer();
            return $http.get(this.options.apiUrl + endPoint,options);
        };

        Service.prototype.genericPost = function(endPoint,options){
            return this.Post(endPoint,options)
                .then(this.responseSuccess)
                .catch(this.responseError);
        };

        Service.prototype.genericGet = function(endPoint,options){
            return this.Get(endPoint,options)
                .then(this.responseSuccess)
                .catch(this.responseError);
        };

        return Service;
    }
})();
(function(){
    'use strict';
    angular.module('mcms.core').
        filter('moment', moment);

    moment.$inject = ['momentFactory'];

    function moment(Moment) {
        return function (date, format) {
            var defaults = {
                format : "DD/MM/YYYY @ HH:mm"
            };

            return Moment(date).format(format || defaults.format);
        };
    }
})();
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
                            if (val){
                                   scope.toRender = flattenTree(val);
                                for (var i in scope.toRender){
                                    temp[scope.toRender[i][Options.value]] = scope.toRender[i];
                                }

                                var className = (attributes.class) ? 'class="'+attributes.class+'"' : '',
                                    emptyOption = Options.emptyOption || '',
                                    multiple = (Options.multiple) ? 'multiple' : '';
                                var html = '<select ng-options="option.' + Options.value +
                                        ' as option.label for option in toRender" ' +
                                    'ng-model="model"'+ className+ ' ' + multiple
                                    + ' ng-change="update()" >'+emptyOption+'</select>';

                                element.html(html);
                                var el = $compile(element.contents())(scope);
                                element.replaceWith(el);
                            }

                        });
                    }
                }
            };
        }]);
})();
(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('toSlug',['slugFactory' , function (slug){
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=toSlug",
                    model : '=ngModel'
                },
                link: function(scope, element, attributes, ngModel) {

                    scope.$watch('model' ,function(val) {
                        if (!val) {
                            return;
                        }
                        scope.otherModelValue = slug(val,{lower: true});
                    });
                }
            };
        }]);
})();
(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('compareTo',  function (){
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function(scope, element, attributes, ngModel) {

                    ngModel.$validators.compareTo = function(modelValue) {
                        return modelValue == scope.otherModelValue;
                    };

                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            };
        });
})();
(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('alertMessage', ['$timeout','$compile', function ($timeout,$compile){
            return {
                require: "?ngModel",
                scope: {
                    success: "=alertMessage"
                },
                //template: ,
                link: function(scope, element, attributes, ngModel) {
                    var template = '<div class="alert alert-{{ alertType }}" ng-if="show">{{ message }}</div>';
                    var time = parseInt(attributes.time) || 5000;
                    scope.alertType = attributes.alertType || 'success';
                    scope.message = element.html();
                    var compiled = $compile(template)(scope);
                    element.html(compiled);

                    scope.$watch("success", function(val) {
                        if (val){
                            scope.show = true;
                            $timeout(function(){
                               scope.show = false;
                            },time);
                        }
                    });
                }
            };
        }]);
})();
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
(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('uploadBox',['configuration', function (Config){
            return {
                require: "ngModel",
                scope: {
                    model : '=ngModel'
                },
                templateUrl: Config.appUrl + "components/uploadBox.directive.html",
                link: function(scope, element, attributes, ngModel) {

                },
                controller : uploadBoxController,
                controllerAs : 'VM'
            };
        }]);

    uploadBoxController.$inject = ['$scope','Upload'];

    function uploadBoxController($scope,Upload){
        var vm = this;
        vm.upload = function (files) {

        };
    }
})();
(function() {
    'use strict';

    angular.module('mcms.dashboard', [
        'mcms.core'
    ]);
})();

(function(){
    angular.module('mcms')
        .controller('dashboardCtrl',dashboardCtrl);

    dashboardCtrl.$inject = ['$rootScope','logger','momentFactory','pageTitle'];

    function dashboardCtrl($rootScope,logger,moment,pageTitle){
        var vm = this;

        pageTitle.set('Dashboard');
    }


})();
(function(){
    'use strict';

    angular.module('mcms')
        .controller('PageHeaderController',PageHeaderController);

    PageHeaderController.$inject = ['$rootScope'];

    function PageHeaderController($rootScope){
        var vm = this;

        $rootScope.$on('set.pageTitle',function(event,title){
            if (typeof title == 'string'){
                vm.pageTitle = title;
                return;
            }

            angular.forEach(title,function(value,key){
                vm[key] = value;
            });
        });
    }
})();
(function(){
    'use strict';

    angular.module('mcms.users',[
        'mcms.core'
    ])
        .config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider','configuration'];

    function moduleConfig($routeProvider,configuration) {
        $routeProvider
            .when('/admin/users', {
                templateUrl: configuration.appUrl + 'users/user-list.html',
                controller: 'userListCtrl',
                controllerAs: 'Users'
            })
            .when('/admin/user/:id',{
                templateUrl: configuration.appUrl + 'users/user.html',
                controller: 'userCtrl',
                controllerAs: 'User'
            });
    }
})();
(function(){
    angular.module('mcms')
        .controller('userListCtrl',userListCtrl);

    userListCtrl.$inject = ['pageTitle'];

    function userListCtrl(pageTitle){
        pageTitle.set('Users');
    }
})();
(function(){
    angular.module('mcms')
        .controller('userCtrl',userCtrl);

    userCtrl.$inject = ['pageTitle','$routeParams'];

    function userCtrl(pageTitle,$routeParams){
        var vm = this;


        pageTitle.set({
            pageTitle : 'User ' + $routeParams.id,
            path : [
                {
                    href : 'admin/users',
                    title : 'Users'
                }
            ]
        });
    }
})();