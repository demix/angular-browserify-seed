'use strict';



var main = {
    src: ['./build/*/index.tpl'],
    reg: /build\/(\w+)\/index\.tpl/,
    dest: './build/'
};


module.exports = {
    main:main
};
