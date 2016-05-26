var LogServer = require('./scripts/logserver.js');
var async = require('async');
var guid = require('guid');
var Thing = require('./scripts/thing.js');

/**
 * Specifies number of log entries to cycle through before logging
 * an error.
 *
 * @type {number}
 */
var failureFrequency = 13;
var messageCount = 0;
var logger = new LogServer();
var timeBetween = 5000;
var StoryEndpoints = ["/publisher/v1/stories/thingmodel/<%= storyId %>", "/publisher/v1/stories/doc/<%= storyId %>",
    "/publisher/v1/stories/home/<%= storyId %>", "/publisher/v1/stories/applenews/<%= storyId %>",
    "/publisher/v1/stories/storyapi/<%= storyId %>", "/publisher/v1/stories/google/<%= storyId %>/",
    "publisher/v1/stories/disqus/<%= storyId %>/<%= status %>"];

var generateGuid = function () {
    return guid.raw();
};


var startLogging = function(err) {
    if (err) {
        console.log(err);
        return;
    }

    async.forever(function (next) {
        var messageGuid = generateGuid(),
            thing, list;


        setTimeout(function (callback) {
            thing = new Thing().getStory();
            list = new Thing().getList();
            console.log("thing: ", thing.id);
            console.log("list: ", list.id);
            async.each([thing, list], function(thingItem, eachDone) {
                async.eachSeries(thingItem.endpoints, function(url, seriesCallback) {
                    if (messageCount % failureFrequency) {
                        setTimeout(function() {
                            logger.getSuccessMessage(seriesCallback, messageGuid, url, thingItem.user, thingItem.id);
                        }, 1000);
                    } else {
                        setTimeout(function() {
                            logger.getFailureMessage(seriesCallback, messageGuid, url, thingItem.user, thingItem.id);
                        }, 1000);
                    }
                    messageCount++;
                }, function done(err) {
                    if (err) {
                        console.log(err);
                    }
                    eachDone();
                });
            }, function(err) {
                callback();
            });

        }, timeBetween, next);

    }, function (err) {
        if (err) {
            console.log(err);
        }
        next();
    });

};

logger.createLogFileIfNotExists(startLogging);
