angular
    .module('humor-da-lua')
    .controller('calendarController', function($scope, calendarService) {
        calendarService.getCalendar(null, function(data) {
            $scope.calendar = data;
        });
    });