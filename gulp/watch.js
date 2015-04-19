var _ = require('lodash');
var browserSync = require('browser-sync');
var chalk = require('chalk');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var watch = require('gulp-watch');

var config = require('./config');

module.exports = function(pipes) {
    return function() {
        _.each(config.watch, function(watchcfg) {
            watch(watchcfg.glob, function() {
                gutil.log(
                    'Watch triggered for', chalk.magenta(watchcfg.glob),
                    'running', chalk.cyan(watchcfg.tasks.toString())
                );
                if(!watchcfg.tasks || !watchcfg.tasks.length) {
                    browserSync.reload();
                    return;
                }
                merge.apply(null, _.map(watchcfg.tasks, function(task) {
                    return pipes[task]();
                }))
                .pipe(browserSync.reload({stream: true}));
            });
        });
    };
};
