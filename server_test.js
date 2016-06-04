var request = require('request'),
    async = require('async'),
    config = require('config'),
    WAIT_TIME = 10000;

var domains = config.get("domains"),
    servicesKey = config.get("ServiceKey"),
    count = 0;

async.forever(function(next) {
    // only call next when call is successful
    setTimeout(function() {
        var url = domains[0] + '/publisher/v1/stories/12345?key=' + servicesKey;
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
    }, WAIT_TIME);
});