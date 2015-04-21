var _ = require('lodash');
var browserSync = require('browser-sync');
var chalk = require('chalk');
var gutil = require('gulp-util');
var merge = require('event-stream').merge;
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
                } else {
                    var all = merge(_.map(watchcfg.tasks, function(task) {
                        return pipes[task]();
                    }));
                    if(watchcfg.stream) {
                        all.pipe(browserSync.reload({stream: true}));
                    } else {
                        all.on('end', function() {
                            browserSync.reload();
                        });
                    }
                }
            });
        });
    };
};
