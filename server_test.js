var request = require('request'),
    async = require('async'),
    config = require('config'),
    _ = require('lodash'),
    WAIT_TIME_MAX = 10000;

var domains = config.get("domains"),
    servicesKey = config.get("ServiceKey"),
    count = 0;

async.forever(function(next) {
    // only call next when call is successful
    setTimeout(function() {
        var url = _.sample(domains) + '/publisher/v1/stories/12345?key=' + servicesKey;
        console.log("POST: " + url);
        request({
            url : url,
            method: "POST"
        }, function(err, res) {
            if (err) {
                console.log(err.message);
            }
            next();
        });
    }, _.random((WAIT_TIME_MAX/10), WAIT_TIME_MAX));
});