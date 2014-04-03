'use strict';

var swig = require('swig');
var grunt = require('grunt');
var path = require('path');

module.exports = function(){
    var config = this.data;
    var done = this.async();

    var files = grunt.file.expand(config.src);

    swig.setDefaults({varControls:['{@','@}'] , cache: false});

    
    files.forEach(function(file){
        grunt.log.writeln('Render template for ' + file);
        var appname = file.match(config.reg)[1];

        swig.renderFile(path.join(process.cwd(),file), {
            appname: appname
        } , function(err , output){
            if( err ){
                grunt.log.error(err);
                done();
            }
            grunt.file.write( path.join( config.dest , appname ,'index.html' ), output );

            done();
        });

    });
};


