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


async.forever(function(next) {
    var logMessage = "";
    if (messageCount % failureFrequency) {
        logger.getFailureMessage(next);
    } else {
        logger.getSuccessMessage(next);
    }
    messageCount++;
}, function(err) {
    if (err) {
        console.log(err);
    }
});