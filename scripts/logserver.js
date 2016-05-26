var async = require('async');
var fs = require('fs');
var _ = require('lodash');

var LogServer = function() {};

/**
 * Template being used for all log messages, both for failure and for success.
 *
 * @type {Function}
 */
LogServer.prototype.MessageTemplate = _.template("<%= timestamp %> Message=<%= message %> UserId=<%= userid %> Queue=<%= queue %> Response=<%= response %>\n");

LogServer.prototype.LogPath = "/tmp/tmpLog.log";

LogServer.prototype.getFailureMessage = function(callback) {
    var self = this;
    try {
        fs.writeFile(self.LogPath, self.MessageTemplate({
                timestamp: new Date().getTime(),
                message: "This is a failure message",
                userid: _.random(1000, 20000),
                queue: "IncomingQueue",
                response: 500
            }),
            callback);
    } catch (err) {
        callback(err);
    }
};

LogServer.prototype.getSuccessMessage = function(callback) {
    var self = this;
    try {
        fs.writeFile(self.LogPath, self.MessageTemplate({
                timestamp: new Date().getTime(),
                message: "This is a success message",
                userid: _.random(1000, 20000),
                queue: "IncomingQueue",
                response: 200
            }),
            callback);
    } catch (err) {
        callback(err);
    }
};

module.exports = LogServer;


