const twitterStrategy = require('passport-twitter').Strategy;
let User = require('../../schemas/User');
const twitterKeys = require('../twitter-keys');

module.exports = new twitterStrategy(
    twitterKeys,
    (token, tokenSecret, profile, done) => {
        User.findOne({ 'userId' : profile.id }
        ).then(
            user => {
                if(user) {
                    return done(null, user);
                }
                let newUser = new User(token,...profile);
                newUser
                    .save()
                    .then(() => done(null, newUser))
                    .catch(done);
            }
        ).catch(done);
    });