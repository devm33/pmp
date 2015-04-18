var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

var config = require('./config');

module.exports = function(gulp) {
    return gulp.src(config.tasks.sass)
    .pipe(require('./plumber')())
    .pipe(sass())
    .pipe(autoprefixer());
    .pipe(gulp.dest(config.dest));
};
