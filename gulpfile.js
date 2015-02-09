var gulp = require('gulp');

var src = 'src/';

gulp.task('serve', function() {
    // serve src / index.html?
});

gulp.task('watch', ['build'], function() {
    // call livereload
});

gulp.task('build', function() {
    // TODO is this needed?
    // inject js?
});

gulp.task('default', function(cb) {
    runSequence('build', 'watch', 'serve', cb);
});
