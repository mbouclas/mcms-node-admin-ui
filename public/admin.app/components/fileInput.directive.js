(function() {
    angular.module('mcms.core')
        .directive('fileInput', fileInput);

    fileInput.$inject = ['$compile','configuration','$rootScope','$timeout'];
    fileInputController.$inject = ['$location','$scope','$timeout','$rootScope','lodashFactory'];

    function fileInput($compile,Config,$rootScope,$timeout) {
        return {
            controller: fileInputController,
            templateUrl : Config.appUrl + "components/fileInput.directive.html",
            require: "ngModel",
            scope : {
                model : '=ngModel',
                config : '=?config',
                callback : '&?callback'
            },
            restrict : 'E',
            controllerAs: 'VM',
            replace : true,
            link: function(scope, element, attributes) {
                scope.image = {};
                scope.uploadConfig = scope.config;
                scope.uploadOptions = Config.fileTypes.image;

                var time = parseInt(attributes.time) || 5000;
                var modal = '<div class="modal fade" id="fileInputModal">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title">Select File</h4>' +
                    '</div>' +
                '<div class="modal-body">' +
                    '<upload-box ' +
                'ng-model="image" config="uploadConfig"' +
                'callback="onUploadDone(file,response)"' +
                'auto-start="true" progress-bar="true"' +
                'accept-select="{{ uploadOptions.acceptSelect }}"' +
                'accept="{{ uploadOptions.accept }}"></upload-box>' +
                '</div>' +
                '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '<button type="button" class="btn btn-primary" ng-click="saveAndClose()">Save changes</button>' +
                '</div>' +
                '</div><!-- /.modal-content -->' +
                '</div><!-- /.modal-dialog -->' +
                '</div>';
                scope.selectFile = function(){
                    scope.showModal = true;
                    var compiled = $compile(modal)(scope);
                    $('body').append(compiled);
                    var modalBox = $('#fileInputModal');
                    //we need to compile the upload-box directive into the modal
                    $timeout(function(){
                        modalBox.modal('show');
                    });


                    modalBox.on('hidden.bs.modal', function (e) {
                        $('#fileInputModal').remove();
                        modalBox = null;
                      });

                };

                scope.onUploadDone = function(file,response){
                    console.log(file,response);
                };

                scope.saveAndClose = function(){

                };
            }
        };

    }

    function fileInputController($location,$scope,$timeout,$rootScope,lo){
        var vm = this;



    }
})();