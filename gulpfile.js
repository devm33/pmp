var _ = require('lodash');
var gulp = require('gulp');
var merge = require('merge-stream');
var watch = require('gulp-watch');

var config = require('./gulp/config');
var plumber = require('./gulp/plumber');

var pipes = _.mapValues(config.tasks, function(config, name) {
    return require('./gulp/' + name)(gulp);
});

gulp.task('serve', ['build', 'watch'], function() {
    // TODO serve index.html (and local folder)
    // use browersync
});

gulp.task('watch', ['build'], function() {
    _.each(config.watch, function(config) {
        watch(config.glob, function() {
            return merge(_.map(config.tasks, function(task) {
                return pipes[task]();
            })).pipe(function() {
                // TODO call livereload
            });
        });
    });
});

var clean = require('./gulp/clean')(dist);
gulp.task('clean', clean);

gulp.task('build', ['clean'], function() {
    // TODO could we pipe jshint here so it goes first?
    return merge(
        pipes.jshint(), pipes.sass(), pipes.inject(), pipes.templates()
    );
});

gulp.task('default', ['build', 'watch', 'serve']);
