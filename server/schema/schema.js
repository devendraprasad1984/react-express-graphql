const {projects, clients} = require('../sampledata')

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql')

//client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => {
        return {
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            email: {type: GraphQLString},
            phone: {type: GraphQLString}
        }
    }
})

const rootQueryObject = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parentValue) {
                return clients
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parentValue, args) {
                return clients.find(client => client.id === args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: rootQueryObject
})
