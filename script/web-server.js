'use strict';

var swig = require('swig');
var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var fs = require('fs');

var app = express();

var appbase = path.join(__dirname , '..', 'app');

app.engine('tpl' , swig.renderFile);
app.set('view engine' , 'tpl');
app.set('views' , appbase );
app.set('view cache', false);
swig.setDefaults({varControls:['{@','@}'] , cache: false});


app.use( '/', express.static( path.join(appbase )));

app.get( /^\/scripts\/(\w+).js/, function(req,res){
    browserify(path.join(appbase, req.params[0] , 'app.js')).call(null,req,res);
});

app.get( /(.*)\.json$/, function(req,res){
    
    fs.readFile(path.join(appbase , 'mock' , req.params[0].split('/').filter(function(item){return item.length ;}).join('.') + '.json') , function(err , data){
        if( err ){
            console.log(err)
            res.send(404);
        }else{
            res.set({
                'Content-Type': 'text/html'
            });
            res.send(data);
        }
            
    });
});



app.get( /^\/(.+?)\/(\w*)/ , function(req,res){
    var appname = req.params[0];
    var tplname = req.params[1];
    res.render( path.join(appname , 'index') , {
        appname:appname,
        tplname: tplname
    } );
} );


//var port = parseInt('9'+ Math.random() * 999);
var port = 9999;
app.listen(port);
console.log('Server start at port ' + port);
