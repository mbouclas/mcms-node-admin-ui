(function(){
    'use strict';

    angular.module('mcms.core')
        .directive('uploadBox',['configuration', function (Config){
            return {
                require: "ngModel",
                scope: {
                    model : '=ngModel',
                    config : '=?config',
                    callback : '&?callback'
                },
                templateUrl: Config.appUrl + "components/uploadBox.directive.html",
                link: function(scope, element, attributes, ngModel) {
                    scope.accept = attributes.accept || 'image/*,application/pdf';
                    scope.acceptSelect = attributes.acceptSelect || 'image/*,audio/*,video/*';
                    scope.imgagePreview = attributes.imagePreview || false;
                    scope.progressBar = attributes.progressBar || false;
                    scope.multiple = attributes.multiple || false;
                    scope.autoStart = attributes.autoStart || false;
                    scope.progressBarDuration = attributes.progressBarDuration || 5000;
                },
                controller : uploadBoxController,
                controllerAs : 'VM'
            };
        }]);

    uploadBoxController.$inject = ['$scope','Upload','configuration','$timeout','lodashFactory','$rootScope'];

    function uploadBoxController($scope,Upload,Config,$timeout,lo,$rootScope){

        var vm = this,
            configObj = {
                headers: {
                    '_csrf': Config.CSRF
                },
                method: 'POST',
                fileFormDataName: 'uploadedFile',
                fields : {}
            };//this directive expects a config object
        configObj = lo.merge($scope.config,configObj);

        $scope.$watch('files', function (files) {
            $scope.formUpload = false;
            if (files != null) {
                $rootScope.$broadcast('file.upload.added',files);

                if ($scope.autoStart){
                    startUpload(files);
                }
            }
        });

        function startUpload(files){
            for (var i = 0; i < files.length; i++) {
                $scope.errorMsg = null;
                (function (file) {
                    upload(file);
                })(files[i]);
            }
        }

        $rootScope.$on('file.upload.startUpload',function(e,files){//new files added
            startUpload(files)
        });

        function upload(file) {
            vm.errorMsg = null;
            uploadUsingUpload(file);
        }

        function uploadUsingUpload(file) {
            configObj.fields._csrf = Config.CSRF;
            configObj.file = file;
            file.upload = Upload.upload(configObj);

            file.show = true;
            file.upload.then(function (response) {
                $rootScope.$broadcast('file.upload.complete',file,response);
                if ($scope.callback){
                    $scope.callback({file : file,response : response.data});
                }

                $timeout(function () {
                    file.result = response.data;
                });

                $timeout(function(){
                    file.show = false;
                },$scope.progressBarDuration);

            }, function (response) {
                if (response.status > 0){
                    $scope.errorMsg = response.status + ': ' + response.data;
                }

                $rootScope.$broadcast('file.upload.error',file,$scope.errorMsg);
            });

            file.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                $rootScope.$broadcast('file.upload.progress',file,file.progress);
            });

            file.upload.xhr(function (xhr) {
                // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
            });
        }

    }
})();