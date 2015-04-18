var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

var config = require('./config');

module.exports = function(gulp) {
    return gulp.src(config.tasks.angular)
    .pipe(require('./plumber')())
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.dest));
};
