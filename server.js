const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

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
app.set('port', (process.env.PORT || 4000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/static'));

configurePassport(app, passport);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const mapRoutes = require('./app/routes');
mapRoutes(app, passport);

app.get('*', (req,res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'static') });
});

app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));