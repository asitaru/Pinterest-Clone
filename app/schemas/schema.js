const graphql = require('graphql');
const mongoose = require('mongoose');


const PinModel = mongoose.model('Pin', {
    title: String,
    url: String
});

const PinType = new graphql.GraphQLObjectType({
    name: 'pin',
    fields: () => ({
            _id: { type: graphql.GraphQLID },
            title: { type: graphql.GraphQLString },
            url: { type: graphql.GraphQLString }
    })
});

function GetAll() {
    return new Promise((resolve, reject) => {
        PinModel.find((err, pins) => {
            err ? reject(err) : resolve(pins);
        })
    });
}

function GetOne(root, {_id}) {
    return new Promise((resolve,reject) => {
        PinModel.findById({_id}, (err, pin) => {
            err? reject(err) : resolve(pin);
        })
    })
}

function AddOne(root, args) {
    let newPin = new PinModel({...args});
    return new Promise((resolve, reject) => {
        newPin.save((err) => {
            err? reject(err) : resolve(newPin);
        })
    })
}

module.exports = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            pins: {
                type: new graphql.GraphQLList(PinType),
                resolve: GetAll
            },
            pin: {
                type: PinType,
                args: {_id: { type: graphql.GraphQLID}},
                resolve: GetOne
            }
        }
    }),
    mutation: new graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addPin: {
                type: PinType,
                args: {
                    title: { type: graphql.GraphQLString },
                    url: { type: graphql.GraphQLString }
                },
                resolve: AddOne
            }
        }
    })
});