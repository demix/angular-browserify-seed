'use strict';

var _ = require('lodash');

var debug = {
    src: ['./build/*/app.js'],
    reg: /build\/(\w+)\/app/,
    dest: './build/scripts/',
    debug:true
};

var online = _.merge(_.clone(debug) , {
    debug:false
});

module.exports = {
    debug: debug,
    online: online
};
