const User = require("../schemas/User");
const twitter = require("./passport-strategies/twitter");

module.exports = (app, passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    });

    passport.use(twitter)
};