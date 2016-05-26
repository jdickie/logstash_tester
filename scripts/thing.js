var _ = require('lodash');

var Thing = function() {};
var ThingUsers = ["bjones", "gdickie", "scthompson", "kkassel", "pmiles"];

/**
 * purposefully small range so we can see duplicates
 *
 * @type {number}
 */
Thing.prototype.id = _.random(44001, 44999);
Thing.prototype.list_id = _.random(55001, 55999);
Thing.prototype.user = _.sample(ThingUsers);

var urls = {
    story : ["/publisher/v1/stories/thingmodel/storyId", "/publisher/v1/stories/doc/storyId",
        "/publisher/v1/stories/home/storyId", "/publisher/v1/stories/applenews/storyId",
        "/publisher/v1/stories/storyapi/storyId", "/publisher/v1/stories/google/storyId/",
        "publisher/v1/stories/disqus/storyId/status"],
    list : ["/publisher/v1/lists/doc/listId", "/publisher/v1/lists/storyapi/listId/parents",
    "/publisher/v1/lists/storyapi/listId/reconcile"]
};

Thing.prototype.getStory = function() {
    var self = this,
        id = _.random(44001, 44999);

    return {
        endpoints : _.map(urls.story, function(url) {
            return _.replace(url, 'storyId', id)
        }),
        id : id,
        user : _.sample(ThingUsers)
    }
};

Thing.prototype.getList = function() {
    var self = this,
        id = _.random(55001, 55999);

    return {
        endpoints : _.map(urls.list, function(url) {
            return _.replace(url, 'listId', id)
        }),
        id : id,
        user : _.sample(ThingUsers)
    }
};

module.exports = Thing;

