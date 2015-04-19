var lazypipe = require('lazypipe');
var plumber = require('gulp-plumber');

module.exports = lazypipe().pipe(plumber, {
    errorHandler: function(error) {
        console.error(error.toString());

        // ensure failed task ends
        this.emit('end');
    }
});
