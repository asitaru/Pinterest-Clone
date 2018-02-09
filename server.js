const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const db = require('./app/config/db');
mongoose.connect(db.url);

const app = express();
app.use(cors());
app.set('port', (process.env.PORT || 4000));
app.use(express.static(__dirname + '/public'));

const Schema = require('./app/schemas/schema');
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    graphiql: true
}));

app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));