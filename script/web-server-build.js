'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

var appbase = path.join(__dirname , '..');


app.use( '/', express.static( path.join(appbase , 'build' )));


app.get( /^\/(.+?)\/(\w*)/ , function(req,res){
    var appname = req.params[0];
    res.set('Content-type' , 'text/html');
    res.send(fs.readFileSync( path.join(appbase,'build', appname , 'index.html') ));
} );

app.get( /(.*)\.json/, function(req,res){
    fs.readFile(path.join(appbase , 'build' , 'mock' , req.params[0].split('/').filter(function(item){return item.length ;}).join('.') + '.json') , function(err , data){
        if( err ){
            res.send(404);
        }else{
            res.set({
                'Content-Type': 'text/html'
            });
            res.send(data);
        }
            
    });
});




//var port = parseInt('9'+ Math.random() * 999);
var port = 9999;
app.listen(port);
console.log('Server start at port ' + port);
