angular.module('pmp/data', [])

.service('Rates', function($http) {
    return $http.get('static/rates.json').then(function(response) {
        return response.data.rates;
    });
});
