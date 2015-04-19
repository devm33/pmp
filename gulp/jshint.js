var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var config = require('./config');

module.exports = function(gulp) {
    return function() {
        return gulp.src(config.tasks.jshint)
        .pipe(require('./plumber')())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
    };
};
