var _ = require('lodash');
var browserSync = require('browser-sync');
var chalk = require('chalk');
var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var rimraf = require('del');
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
            gutil.log(
                'Watch triggered for', chalk.magenta(watchcfg.glob),
                'running', chalk.cyan(watchcfg.tasks.toString())
            );
            merge.apply(null, _.map(watchcfg.tasks, function(task) {
                return pipes[task]();
            }))
            .pipe(browserSync.reload({stream: true}));
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
