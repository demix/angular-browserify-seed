'use strict';

var log = require('./lib/log');
var path = require('path');
var fs = require('fs');

function main(){
    var args = process.argv.slice(2);
    
    if(!args.length){
        log.error('Please specify app name.Exit.');
        process.exit(1);
    }

    var appname = args.shift();
    
    var apppath = path.join( process.cwd() , 'app' , appname );

    if( fs.existsSync(apppath) &&  fs.statSync( apppath ).isDirectory() ){
        log.error('App '+ appname + ' exists.Exit.');
        process.exit(1);
    }

    fs.mkdirSync(apppath);
    
    var subfolder = ['controllers','views'];

    subfolder.forEach(function(f){
        fs.mkdirSync(path.join(apppath, f));
    });
    
    fs.writeFileSync( path.join(apppath, 'index.tpl') ,
                      '{% extends "../common/parent.tpl" %}\n{% block styles %}\n{% parent %}\n{% endblock %}\n{% block content %}\n\n'
                      +'{% endblock %}\n{% block scripts %}\n{% parent %}\n{% endblock %}' );

    fs.writeFileSync( path.join(apppath , 'app.js') , '"use strict;"\n//use require("module_name") to require files.\n' );
    fs.writeFileSync( path.join(apppath , '..' , 'styles' , appname+'.css') , '/*styles for module '+ appname +'*/\n' );

    log.success('All done.Enjoy your app.');
}




main();
