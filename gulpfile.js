var browserSync = require('browser-sync');
var gulp = require('gulp');
var merge = require('event-stream').merge;
var del = require('del');
var series = require('stream-series');

var config = require('./gulp/config');
var pipes = require('./gulp/pipes')(gulp);

gulp.task('serve', ['build', 'watch'], function() {
    browserSync({server: {baseDir: './'}});
});

gulp.task('watch', ['build'], require('./gulp/watch')(pipes));

gulp.task('clean', function(cb) { 
    del(config.dest, cb);
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
