const {projects, clients} = require('../sampledata')
//bring in mongoose models here
const Project = require('../models/Project')
const Client = require('../models/Client')


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType
} = require('graphql')

const StatusObject = {
    type: new GraphQLEnumType({
        name: 'ProjectStatusUpdate',
        values: {
            new: {value: 'Not Started'},
            progress: {value: 'In Progress'},
            completed: {value: 'Completed'},
        },
    }),
}

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
                return Client.find()
            }
        }, client: {
            type: ClientType, args: {id: {type: GraphQLID}}, resolve(parentValue, args) {
                return findClient(args.id)
            }
        }
    }
})
//mutations
const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save()
            }
        },
        deleteClient: {
            type: ClientType,
            args: {id: {type: GraphQLNonNull(GraphQLID)}},
            resolve(parent, args) {
                return Client.findByIdAndRemove(args.id)
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {...StatusObject, defaultValue: 'Not started'},
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return project.save()
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id);
            },
        },

        // Update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {...StatusObject},
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    {new: true}
                );
            },
        },


    }
})


module.exports = new GraphQLSchema({
    query: rootQueryObject,
    mutation
})
