'use strict';

var grunt = require('grunt');
var path = require('path');
var fs = require('fs');

var minify = require('html-minify').minify;


var inlinereg = /['"]? *(templateUrl *['"]? *: *['"].+?['"])/ig;
var filereg = /templateUrl *['"]? *: *['"](.+?)['"]/i;

module.exports= function(){

    var config = this.data;

    var files = grunt.file.expand(config.src);

    if( config.targets ){
        config.targets.forEach(function(target){
            var name = target.name,
                filepath = path.join( process.cwd(), target.folder || '' , name );
            
            if( !fs.exists(filepath) )return;

            var html = fs.readFileSync(filepath).toString();

            html = minify(html , {
                removeComments: true,
                collapseWhitespace: true
            });


            files.forEach(function(file){
                var content = fs.readFileSync(path.join(process.cwd(), file));
                var result;
                while( (result= inlinereg.exec(content)) != null ){
                    var filefrag = content.slice(result.index,inlinereg.lastIndex);
                    if( filefrag.toString().search(filereg) != -1 && filefrag.toString().match(filereg)[1] == name){
                        
                        grunt.log.writeln('Inline template for template-' + name + ' in file-' + file);
                        html = html.replace(/"/ig , '\\"').replace(/'/ig, "\\'");
                        var filesource = content.slice(0, result.index) 
                                + 'template:"'+ html +'"'
                                + content.slice(inlinereg.lastIndex);
                        fs.writeFileSync( file , filesource );
                    }
                }
            });
        });
    }
};
