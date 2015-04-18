var del = require('del');

module.exports = function(dir) {
    return function(cb) {
        del(dir, cb);
    };
};
