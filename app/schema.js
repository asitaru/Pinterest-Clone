var { buildSchema } = require('graphql');
const Pin = buildSchema(`
    type Query {
        hello: String
    }
`);

const PinRoot = {
    hello: () => 'Hello world'
};

module.exports = { Pin, PinRoot };