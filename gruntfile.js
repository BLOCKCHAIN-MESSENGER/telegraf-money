module.exports = function(grunt) {
    // load grunt tasks based on dependencies in package.json
    require('load-grunt-tasks')(grunt);

    grunt.config.init({
        useminPrepare: {
            html: 'www/index.html',
            options: {
                dest: 'www'
            }
        },
        usemin:{
            html:['www/index.html']
        },

        copy:{
            html: {
                src: './www/index_dev.html', dest: 'www/index.html'
            }
        }
    });

    grunt.registerTask('default',[
        'copy:html',
        'useminPrepare',
        'concat',
        'cssmin:generated',
        'uglify',
        // 'cssmin',
        'usemin'
    ]);
};

