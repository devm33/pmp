var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');

var config = require('../config');

module.exports = function(gulp) {
    return function() {
        return gulp.src(config.tasks.inject.html)
        .pipe(require('./plumber')())
        .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {
            name: 'bower', relative: true
        }))
        .pipe(gulp.dest('.'));
    };
};
