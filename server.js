const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const db = require('./app/config/db');
mongoose.connect(db.url);

const app = express();
app.use(cors());
app.set('port', (process.env.PORT || 4000));

//TODO not sure if any request body parsing will be needed because of GraphQL
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/static'));

const Schema = require('./app/schemas/schema');
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.get('/*', (req,res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'static') });
});

app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));