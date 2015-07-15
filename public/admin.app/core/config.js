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
        componentsUrl : componentsUrl,
        fileTypes : {
            image : {
                accept : 'image/*',
                acceptSelect : 'image/jpg,image/JPG,image/jpeg,image/JPEG,image/PNG,image/png,image/gif,image/GIF'
            },
            document : {
                accept : 'application/pdf,application/doc,application/docx',
                acceptSelect : 'application/pdf,application/doc,application/docx'
            },
            file : {
                accept : 'application/*',
                acceptSelect : 'application/*'
            },
            audio : {
                accept : 'audio/*',
                acceptSelect : 'audio/*'
            }
        }
    };

    core.value('config', config);
    core.constant('configuration',config);
})();
