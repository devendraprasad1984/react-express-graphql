import {GraphQLServer} from 'graphql-yoga'

//all type definitions for apis  goes here
//5 scaler types - single discrete value: String, Boolean, Int, Float, ID
//! - required
//non scaler types: objects, arrays
const typeDefs = `
    type Query {
        hello: String!
        me: User!
        post: Post!
        greeting(name: String): String!
        addition(val1: Int!, val2: Int!): Int!
        grades: [Int!]!
    }
    type User {
        id: ID!,
        name: String!
        email: String!
        age: Int
    }
    type Post {
        id: ID!
        post: String!
        postedBy: User!
        published: Boolean
    }
`

//all resolver function goes here
const resolvers = {
    Query: {
        hello: () => {
            return `this is my first hello world query.`
        },
        me: () => {
            let id = 'abd312'
            let name = 'devendra'
            let email = 'dp@gmail.com'
            let age = 39
            return {
                id, name, email, age
            }
        },
        post: () => {
            return {
                id: '897',
                post: 'This is posted by dp',
                postedBy: {
                    id: 'abd312',
                    name: 'devendra'
                },
                published: true
            }
        },
        greeting: (parent, args, ctx, info) => {
            return `hello ${args.name}`
        },
        addition: (parent, args, ctx, info) => {
            return args.val1 + args.val2
        },
        grades: (parent, args, ctx, info) => {
            return [99, 12, 10]
        }
    }
}


const server = new GraphQLServer({
    typeDefs,
    resolvers
})

const BaseServer = server
export default BaseServer