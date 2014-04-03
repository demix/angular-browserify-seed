

require('colors');



var log = function(message){
    console.log(message.cyan);
};

var error = function(message , usage , die){
    if (message instanceof Error) {
        console.log(('✖ ' + message.message).red.bold);
        if (message.stack) {
            console.log(('\t' + message.stack).red.bold);
        }
    } else {
        console.log(('✖ ' + message).red.bold);
    }
    if (usage) {
        console.log('usage:\n' + usage.grey);
    }
    if (die) {
        process.exit(-1);
    }
};


var warn = function(message){
    console.log(('⚠ ' + message).yellow);
};

var success = function(message) {
    console.log(('✔ ' + message).green.bold);
};


exports.log = log;
exports.warn = warn;
exports.error = error;
exports.success = success;
