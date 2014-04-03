'use strict';

var main = {
    expand:true,
    cwd: './build/',
    src:[
        'common' 
        , 'mock'
        , 'scripts/lib'
        ,'*/index.tpl'
        ,'*/*.js'
        ,'!scripts/*.js'
        ,'*/controller/'
    ]
};


module.exports = {
    main:main
};
