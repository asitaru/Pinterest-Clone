const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const app = express();

app.set('port', (process.env.PORT || 4000));

const db = require('./app/config/db');
mongoose.connect(db.url);

const { Pin, PinRoot } = require('./app/schema');

app.use('/graphql', graphqlHTTP({
    schema: Pin,
    rootValue: PinRoot,
    graphiql: true
}));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));