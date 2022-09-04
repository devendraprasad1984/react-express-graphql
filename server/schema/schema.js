const {projects, clients} = require('../sampledata')
//bring in mongoose models here
const Project = require('../models/Project')
const Client = require('../models/Client')


const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList} = require('graphql')

const findClient = (id) => {
    // return clients.find(client => client.id === id)
    //return from DB mongo
    return Client.findById(id)
}
//client type
const ClientType = new GraphQLObjectType({
    name: 'Client', fields: () => {
        return {
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            email: {type: GraphQLString},
            phone: {type: GraphQLString}
        }
    }
})
//project type
const ProjectType = new GraphQLObjectType({
    name: 'Project', fields: () => {
        return {
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            status: {type: GraphQLString},
            client: {
                type: ClientType, resolve(parent, args) {
                    return findClient(parent.clientId)
                }
            }
        }
    }
})

const rootQueryObject = new GraphQLObjectType({
    name: 'rootQueryType', fields: {
        projects: {
            type: new GraphQLList(ProjectType), resolve(parentValue, args) {
                // return projects
                return Project.find()
            }
        }, project: {
            type: ProjectType, args: {id: {type: GraphQLID}}, resolve(parentValue, args) {
                // return projects.find(project => project.id === args.id)
                return Project.findById(args.id) //use mongo models query stuff to query from DB
            }
        }, clients: {
            type: new GraphQLList(ClientType), resolve(parentValue, args) {
                return clients
            }
        }, client: {
            type: ClientType, args: {id: {type: GraphQLID}}, resolve(parentValue, args) {
                return findClient(args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: rootQueryObject
})
