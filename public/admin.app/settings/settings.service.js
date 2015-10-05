(function() {
    'use strict';

    angular.module('mcms.settings')
        .service('settings.dataService', dataService);

    dataService.$inject = ['core.dataService', 'configuration'];

    function dataService(baseService,Config){
        var dataServiceObj;
        dataServiceObj = Object.create(new baseService({
            apiUrl : Config.apiUrl + 'settings/'
        }));

        dataServiceObj.get = get;
        dataServiceObj.update = update;


        return dataServiceObj;
    }

    function get(){
        return this.Post('get',{}).then(this.responseSuccess);
    }

    function update(data){
        return this.Post('update',{data : data}).then(this.responseSuccess);
    }
})();