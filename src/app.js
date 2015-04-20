angular.module('pmp', [
    'pmp/project',
    'templates',
    'ui.bootstrap',
    'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('project', {
        url: '/',
        templateUrl: 'project/project.html',
        controller: 'ProjectCtrl',
    });
});
