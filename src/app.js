angular.module('pmp', [
    'pmp/nav',
    'pmp/project',
    'pmp/rates',
    'templates',
    'ui.bootstrap',
    'ui.router',
])

.constant('pmpStates', [
    {
        name: 'project',
        url: '/',
        template: '<project></project>',
    },
    {
        name: 'rates',
        url: '/rates',
        template: '<rates></rates>',
    }
])

.config(function(pmpStates, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    _.each(pmpStates, function(state) {
        _.defaults(state, {title: Case.title(state.name)});
        $stateProvider.state(state.name, state);
    });
});
