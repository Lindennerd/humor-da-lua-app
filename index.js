(function() {
    var isDevEnv = true;
    
    var app = angular.module('humor-da-lua', ['ngRoute', 'ngMaterial']);
    
    app.constant('API_CONFIG', {
        url: isDevEnv 
            ? "http://localhost:8080/calendar" 
            : "https://humor-da-lua.herokuapp.com/calendar"
    });

    app.config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'templates/calendar.html',
            controller: 'calendarController',
            controllerAs: 'vm'
        })
    });
})();