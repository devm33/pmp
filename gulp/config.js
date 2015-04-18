var _ = require('lodash');

var src = 'src/';
var globs = _.reduce(['js', 'html', 'scss'], function(ret, ext) {
    ret[ext] = src + '**/*.' + ext;
    return ret;
});

module.exports = {
    src: src,
    dest: 'dist/',
    tasks: {
        jshint: globs.js,
        templates: globs.html,
        sass: globs.scss,
        inject: {
            html: 'index.html',
            js: globs.js,
        }
    },
    watch: {
        js: {
            glob: globs.js,
            tasks: ['jshint', 'inject'],
        },
        bower: {
            glob: 'bower.json',
            tasks: ['inject'],
        },
        html: {
            glob: globs.html,
            tasks: ['templates']
        }
        sass: {
            glob: globs.scss,
            tasks: ['sass'],
        },
    },
};
