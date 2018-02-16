const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');

const passport = require('passport');
const configurePassport = require('./app/config/passport');

const db = require('./app/config/db');
mongoose.connect(db.url).then(
    () => {
        console.log("Connection established successfully");
    },
    () => {
        console.log("Error connecting to MLab");
    }
);

const app = express();
app.use(cors());
app.set('port', (process.env.PORT || 4000));

//TODO not sure if any request body parsing will be needed because of GraphQL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/static'));

configurePassport(app, passport);

app.use(session({
    secret: 'fmlthisentireauththingiscrazy',
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/login', passport.authenticate('twitter'));
app.get('/api/login/callback',
    passport.authenticate('twitter', { failureRedirect: '/'}),
    (req, res) => {
        console.log(res.user);
        res.redirect('/');
    }
);

const Schema = require('./app/schemas/schema');
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.get('*', (req,res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'static') });
});

app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));