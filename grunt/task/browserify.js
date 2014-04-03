'use strict';

var browserify = require('browserify');
var grunt = require('grunt');
var path = require('path');

module.exports = function(){
    var config = this.data;
    var done = this.async();

    var files = grunt.file.expand(config.src);


    var options = {
        debug: config.debug
    };

    
    files.forEach(function(file){
        grunt.log.writeln('Browserify for ' + file);
        var appname = file.match(config.reg)[1];
        var brs = browserify(file);

        brs.bundle(options, function(err, src){
            if( err ){
                grunt.log.error(err);
                done();
            }

            grunt.file.write( path.join( config.dest , appname+'.js' ), src );

            done();
        });

    });
};


