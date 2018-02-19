const graphqlHTTP = require('express-graphql');

const AuthController = require('./controllers/AuthController');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};

module.exports = (app, passport) => {
    app.post('/api/login', AuthController.LoginValidation, AuthController.Login(passport));

    app.post('/api/register', AuthController.RegisterValidation, AuthController.Register);

    // app.get('/api/login/twitter/callback',
    //     passport.authenticate('twitter', { failureRedirect: '/'}),
    //     (req, res) => {
    //         res.json(req.user);
    //     }
    // );
    // app.get('/api/login/twitter', passport.authenticate('twitter'));


    const Schema = require('./schemas/schema');
    app.use('/graphql', graphqlHTTP({
        schema: Schema,
        graphiql: true
    }));
};