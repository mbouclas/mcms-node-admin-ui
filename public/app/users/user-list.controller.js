(function(){
    angular.module('mcms')
        .controller('userListCtrl',userListCtrl);

    userListCtrl.$inject = ['pageTitle'];

    function userListCtrl(pageTitle){
        pageTitle.set('Users');
    }
})();