var _ = require('lodash');

var src = 'src/';
var dest = 'dist/';

var globs = _.reduce(['js', 'html', 'scss'], function(ret, ext) {
    ret[ext] = src + '**/*.' + ext;
    return ret;
}, {});

globs.destjs = dest + '**/*.js';

module.exports = {
    src: src,
    dest: dest,
    tasks: {
        js: {
            src: globs.js,
            dest: 'app.js',
        },
        jshint: globs.js,
        templates: globs.html,
        sass: globs.scss,
        inject: {
            html: 'index.html',
            js: globs.destjs,
        }
    },
    watch: {
        js: {
            glob: globs.js,
            tasks: ['jshint', 'js'],
        },
        distjs: {
            glob: globs.destjs,
            tasks: ['inject'],
        },
        bower: {
            glob: 'bower.json',
            tasks: ['inject'],
        },
        html: {
            glob: globs.html,
            tasks: ['templates']
        },
        sass: {
            glob: globs.scss,
            tasks: ['sass'],
        },
    },
};
