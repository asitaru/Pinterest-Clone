const twitterStrategy = require('passport-twitter').Strategy;
let User = require('../../schemas/User');
const twitterKeys = require('../twitter-keys');

module.exports = new twitterStrategy(
    twitterKeys,
    (token, tokenSecret, profile, done) => {
        User.findOne({ 'twitterId' : profile.id }
        ).then( user => {
            if(user) {
                return done(null, user);
            }
            let userMap = {
                twitterId: profile.id,
                token: token,
                displayName: profile.displayName,
                username: profile.username
            };
            let newUser = new User(userMap);
            newUser
                .save()
                .then(() => done(null, newUser))
                .catch(done);
            }
        ).catch(done);
    });