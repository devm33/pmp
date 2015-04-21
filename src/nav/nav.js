angular.module('pmp/nav', [
    'ui.router',
])

.directive('pmpNav', function() {
    return {
        templateUrl: 'nav/nav.html',
        controller: 'pmpNavCtrl',
        controllerAs: 'ctrl',
    };
})

.controller('pmpNavCtrl', function(pmpStates, $state) {
    this.states = pmpStates;
    this.$state = $state;
});
