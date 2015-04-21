angular.module('pmp/rates', [
    'pmp/data',
    'ngHandsontable',
])

.directive('rates', function() {
    return {
        templateUrl: 'rates/rates.html',
        controller: 'RatesCtrl',
        controllerAs: 'ctrl',
    };
})

.controller('RatesCtrl', function(Rates) {
    var ctrl = this;
    ctrl.rates = [];
    Rates.then(function(rates) {
        ctrl.rates = rates;
    });
});
