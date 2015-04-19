angular.module('pmp', [
    'pmp/default',
    'templates',
    'ui.bootstrap',
    'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('default', {
        url: '/',
        templateUrl: 'default/default.html',
        controller: 'DefaultCtrl',
    });
});
