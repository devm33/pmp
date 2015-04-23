var _ = require('lodash');

var src = 'src/';
var dest = 'dist/';

var globs = _.reduce(['js', 'html', 'scss'], function(ret, ext) {
    ret[ext] = src + '**/*.' + ext;
    return ret;
}, {});

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
        }
    },
    watch: {
        js: {
            glob: globs.js,
            tasks: ['jshint', 'js'],
        },
        bower: {
            glob: 'bower.json',
            tasks: ['inject'],
        },
        static: {
            glob: ['index.html', 'static/**/*'],
            tasks: [],
        },
        html: {
            glob: globs.html,
            tasks: ['templates']
        },
        sass: {
            glob: globs.scss,
            tasks: ['sass'],
            stream: true,
        },
    },
};
