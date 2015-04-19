var _ = require('lodash');
var browserSync = require('browser-sync');
var rimraf = require('del');
var gulp = require('gulp');
var merge = require('merge-stream');
var series = require('stream-series');
var watch = require('gulp-watch');

var config = require('./gulp/config');
var pipes = require('./gulp/pipes')(gulp);

gulp.task('serve', ['build', 'watch'], function() {
    browserSync({server: {baseDir: './'}});
});

gulp.task('watch', ['build'], function() {
    _.each(config.watch, function(watchcfg) {
        watch(watchcfg.glob, function() {
            var combined = merge();
            return _.each(watchcfg.tasks, function(task) {
                combined.add(pipes[task]());
            });
            // TODO check if browserSync is up?
            // combined.on('end', browserSync.reload);
        });
    });
});

gulp.task('clean', function(cb) { 
    rimraf(config.dest, cb);
});

gulp.task('build', ['clean'], function() {
    return merge(
        pipes.sass(),
        pipes.templates(),
        series(
            pipes.jshint(),
            pipes.js(),
            pipes.inject()
        )
    );
});

gulp.task('default', ['build', 'watch', 'serve']);
