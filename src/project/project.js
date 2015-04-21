angular.module('pmp/project', [])

.directive('project', function() {
    return {
        templateUrl: 'project/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'ctrl',
    };
})

.controller('ProjectCtrl', function() {

});
