var async = require('async');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');

var LogServer = function () {
};

/**
 * Template being used for all log messages, both for failure and for success.
 *
 * @type {Function}
 */
LogServer.prototype.MessageTemplate = _.template("<%= timestamp %> <%= message %> ThingId=<%= thingId %> CorrelationId=<%= correlation_id %> URL=<%= endpoint %> User=<%= username %> Response=<%= response %> \n");

LogServer.prototype.LogPath = "/tmp/tmpLog.log";

LogServer.prototype.getTimeStamp = function () {
    return moment().format();
};

LogServer.prototype.createLogFileIfNotExists = function(callback) {
    var self = this;
    fs.exists(self.LogPath, function(exists) {
        if (!exists) {
            fs.writeFile(self.LogPath, '', function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback();
            });
        } else {
            callback();
        }
    });
};

/**
 *
 * @param callback
 * @param guid
 * @param url
 * @param user
 * @param thingId
 */
LogServer.prototype.getFailureMessage = function (callback, guid, url, user, thingId) {
    var self = this;
    try {
        fs.appendFile(self.LogPath, self.MessageTemplate({
                timestamp: self.getTimeStamp(),
                message: "This is a failure message",
                thingId: thingId,
                correlation_id: guid,
                endpoint: url,
                username: user,
                response: 500
            }),
            callback);
    } catch (err) {
        callback(err);
    }
};

/**
 *
 * @param callback
 * @param guid
 * @param url
 * @param user
 * @param thingId
 */
LogServer.prototype.getSuccessMessage = function (callback, guid, url, user, thingId) {
    var self = this;
    try {
        fs.appendFile(self.LogPath, self.MessageTemplate({
                timestamp: self.getTimeStamp(),
                message: "This is a success message",
                thingId: thingId,
                correlation_id: guid,
                endpoint: url,
                username: user,
                response: 200
            }),
            callback);
    } catch (err) {
        callback(err);
    }
};

module.exports = LogServer;


