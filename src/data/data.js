angular.module('pmp/data', [])

.service('Rates', function($http) {
    var Rates = [];
    Rates.promise = $http.get('static/rates.json').then(function(response) {
        _.extend(Rates, response.data);
        return Rates;
    });
    return Rates;
});
