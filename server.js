var LogServer = require('./scripts/logserver.js');
var async = require('async');

/**
 * Specifies number of log entries to cycle through before logging
 * an error.
 *
 * @type {number}
 */
var failureFrequency = 4;
var messageCount = 0;
var logger = new LogServer();
var timeBetween = 5000;

async.forever(function(next) {
    var logMessage = "";
    setTimeout(function(callback) {
        if (messageCount % failureFrequency) {
            logger.getSuccessMessage(callback);
        } else {
            logger.getFailureMessage(callback);
        }
        messageCount++;
    }, timeBetween, next);

}, function(err) {
    if (err) {
        console.log(err);
        next();
    }
});