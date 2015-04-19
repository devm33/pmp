var _ = require('lodash');
var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var merge = require('merge-stream');
var watch = require('gulp-watch');

var config = require('./gulp/config');
var plumber = require('./gulp/plumber');

var pipes = _.mapValues(config.tasks, function(config, name) {
    return require('./gulp/' + name)(gulp);
});

gulp.task('serve', ['build', 'watch'], function() {
    browserSync({server: {baseDir: './'}});
});

gulp.task('watch', ['build'], function() {
    _.each(config.watch, function(config) {
        watch(config.glob, function() {
            return merge(_.map(config.tasks, function(task) {
                return pipes[task]();
            }))
            .pipe(browserSync.reload);
        });
    });
});

gulp.task('clean', function(cb) { 
    del(config.dest, cb);
});

gulp.task('build', ['clean'], function() {
    // TODO could we pipe jshint here so it goes first?
    return merge(
        pipes.jshint, pipes.sass, pipes.inject, pipes.templates
    );
});

gulp.task('default', ['build', 'watch', 'serve']);
