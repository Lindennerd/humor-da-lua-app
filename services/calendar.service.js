angular
    .module('humor-da-lua')
    .service('calendarService', function($http, API_CONFIG){
        this.getCalendar = function(month, callback) {
            var url = month 
                ? API_CONFIG.url + '?month=' + month
                : API_CONFIG.url;

            $http.get(url)
                .then(function(response) {
                    if(callback) {
                        callback(response.data);
                    }
                })
        }
    })