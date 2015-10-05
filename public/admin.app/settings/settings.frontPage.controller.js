(function(){
    angular.module('mcms.settings')
        .controller('frontPageCtrl',frontPageCtrl);

    frontPageCtrl.$inject = ['$rootScope','logger','pageTitle','settings.dataService','configuration'];

    function frontPageCtrl($rootScope,logger,pageTitle,DS,Config){
        var vm = this;
        DS.get().then(function(layout){
           vm.Layout = layout;
        });

        vm.uploadConfig = {
            url : Config.apiUrl + 'uploadImageForFrontPage',
            fields : {}
        };

        vm.saveForm = function(){
            vm.success = true;
            console.log(vm.Layout);
            DS.update(vm.Layout).then(function(result){
                console.log(result);
            });
        };

        pageTitle.set('Front Page Layout');
    }


})();