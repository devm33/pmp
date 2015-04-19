var templateCache = require('gulp-angular-templatecache');

var config = require('./config');

module.exports = function(gulp) {
    return function() {
        return gulp.src(config.tasks.templates)
        .pipe(require('./plumber')())
        .pipe(templateCache())
        .pipe(gulp.dest(config.dest));
    };
};
