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

    var currentMonth = moment().month();
    ctrl.months = _.times(5, function(index) {
        var month = moment().month(currentMonth + index);
        return {
            data: month.format('MM_YYYY'),
            title: month.format('MMM YYYY')
        };
    });
    // ctrl.columns.unshift({ data: 'name', title: 'Name' });
});
