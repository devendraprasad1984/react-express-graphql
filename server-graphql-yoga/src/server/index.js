import {GraphQLServer} from 'graphql-yoga'


const users=[
    {id:1,name:'dp',email:'dp@abc.com'},
    {id:2,name:'dp1',email:'dp@abc.com'},
    {id:3,name:'dp2',email:'dp@abc.com'}
]
const posts=[
    {id:1,title:'test title',body:'this is nice', published:true},
    {id:2,title:'test title1',body:'this is nice1', published:false},
    {id:3,title:'test title2',body:'this is nice2', published:false},
    {id:4,title:'test title3',body:'this is nice3', published:true},
]

//all type definitions for apis  goes here
//5 scaler types - single discrete value: String, Boolean, Int, Float, ID
//! - required
//non scaler types: objects, arrays
const typeDefs = `
    type Query {
        hello: String!
        greeting(name: String): String!
        addition(val1: Int!, val2: Int!): Int!
        grades: [Int!]!

        me: User!
        post: Post!
        users(query: String): [User!]!
        posts: [Post!]!
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
        users(parent, args, ctx, info){
            if(!args.query) return users
            let filteredUsers = users.filter((user)=>user.name.toLowerCase().includes(args.query.toLowerCase()))
            return filteredUsers
        },
        posts(parent, args, ctx, info){
            return posts
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