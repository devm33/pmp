var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');

var config = require('./config');

module.exports = function(gulp) {
    return function() {
        return gulp.src(config.tasks.js.src)
        .pipe(require('./plumber')())
        .pipe(ngAnnotate())
        .pipe(concat(config.tasks.js.dest))
        .pipe(gulp.dest(config.dest));
    };
};
