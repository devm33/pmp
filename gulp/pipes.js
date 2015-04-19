var _ = require('lodash');
var chalk = require('chalk');
var gutil = require('gulp-util');
var prettyTime = require('pretty-hrtime');

var config = require('./config');

module.exports = function(gulp) {
    return _.mapValues(config.tasks, function(config, name) {
        var pipeFn = require('./tasks/' + name)(gulp);
        return function() {
            var start = process.hrtime();
            gutil.log('Starting', '\'' + chalk.cyan(name) + '\'...');
            var stream = pipeFn();
            stream.on('end', function() {
                var time = prettyTime(process.hrtime(start));
                gutil.log(
                    'Finished', '\'' + chalk.cyan(name) + '\'',
                    'after', chalk.magenta(time)
                );
            });
            return stream;
        };
    });
};
