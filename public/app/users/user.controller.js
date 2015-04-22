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