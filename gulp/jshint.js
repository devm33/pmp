var jshint = require('gulp-jshint');

var config = require('./config');

module.exports = function(gulp) {
    return gulp.src(config.tasks.jshint)
    .pipe(require('./plumber')())
    .pipe(jshint())
    .pipe(gulp.dest(config.dest));
};
