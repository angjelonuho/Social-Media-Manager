const twitterFollowers  = require('./controllers/twitterFollowersController');
const twitterFeed = require('./controllers/twitterFeedController');

module.exports = (app) => {
app.get('/followers', twitterFollowers.twitterFollowers),
app.get('/feed', twitterFeed.twitterFeed)

}