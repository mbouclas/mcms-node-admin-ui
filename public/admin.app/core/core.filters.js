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