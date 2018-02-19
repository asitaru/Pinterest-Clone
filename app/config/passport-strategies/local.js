const LocalStrategy = require('passport-local').Strategy;
const User = require('../../schemas/User');

module.exports = new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'Unknown User'});
        }

        User.comparePassword(password, user.password,(err, isMatch) => {
            if(err) return done(err);
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid Password'});
            }
        });
    })
});