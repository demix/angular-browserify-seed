'use strict';

var main = {

};

var test = {
    command:"sshpass -p 'SafetyFirst@426' scp -r build/* root@10.12.137.181:/search/miniwan/webapp/static/mini/v2.4"
};


module.exports = {
    main:main,
    test:test
};
