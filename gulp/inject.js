var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');

var config = require('./config');

module.exports = function(gulp) {
    return gulp.src(config.tasks.inject.html)
    .pipe(require('./plumber')())
    .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(inject(gulp.src(config.tasks.inject.js, {read: false})))
    .pipe(gulp.dest('.'));
};
