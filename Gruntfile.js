'use strict';

var browserifyTask = require('./grunt/task/browserify');
var swigTask = require('./grunt/task/swig');
var inlineTemplateTask = require('./grunt/task/inline-template');

module.exports = function(grunt){



    grunt.initConfig({
        "pkg": grunt.file.readJSON('package.json'),
        "browserify": require('./grunt/config/browserify'),
        "swig": require('./grunt/config/swig'),
        "copy": require('./grunt/config/copy'),
        "cssmin": require('./grunt/config/cssmin'),
        "uglify": require('./grunt/config/uglify'),
        "clean": require('./grunt/config/clean'),
        "inline-template": require('./grunt/config/inline-template')
    });


    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('delete-build', function() {
        if (grunt.file.exists('build')) {
            grunt.file.delete('build');
        }
    });

    grunt.registerTask('mk-build', function() {
        if (!grunt.file.exists('build')) {
            grunt.file.mkdir('build');
        }
    });



    grunt.registerMultiTask('browserify', browserifyTask);
    grunt.registerMultiTask('swig', swigTask);
    grunt.registerMultiTask('inline-template', inlineTemplateTask);

    grunt.registerTask('base' , ['delete-build', 'mk-build', 'copy']);

    grunt.registerTask('debug' , ['base', 'browserify:debug' , 'swig' , 'inline-template' , 'clean']);

    grunt.registerTask('online' , ['base', 'browserify:online' , 'cssmin' , 'uglify' , 'swig' , 'inline-template' , 'clean']);


    


};
