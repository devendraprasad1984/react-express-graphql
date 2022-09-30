import { GraphQLServer } from "graphql-yoga";

const users = [
  { id: 1, name: "dp", email: "dp@abc.com" },
  { id: 2, name: "dp1", email: "dp@abc.com" },
  { id: 3, name: "dp2", email: "dp@abc.com" },
];
const posts = [
  {
    id: 1,
    title: "test title",
    body: "this is nice",
    published: true,
    author: 1,
  },
  {
    id: 2,
    title: "test title1",
    body: "this is nice1",
    published: false,
    author: 1,
  },
  {
    id: 3,
    title: "test title2",
    body: "this is nice2",
    published: false,
    author: 2,
  },
  {
    id: 4,
    title: "test title3",
    body: "this is nice3",
    published: true,
    author: 3,
  },
];
const comments = [
  { id: "102", text: "commen1", author: 1 },
  { id: "103", text: "commen2", author: 2 },
  { id: "104", text: "commen3", author: 3 },
  { id: "105", text: "commen4", author: 2 },
];

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
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }
    type User {
        id: ID!,
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean
        author: User!
    }
    type Comment{
        id: ID!
        text: String!
        author: User!
    }
`;

//all resolver function goes here
const resolvers = {
  Query: {
    hello: () => {
      return `this is my first hello world query.`;
    },
    me: () => {
      let id = "abd312";
      let name = "devendra";
      let email = "dp@gmail.com";
      let age = 39;
      return {
        id,
        name,
        email,
        age,
      };
    },
    users(parent, args, ctx, info) {
      if (!args.query) return users;
      let filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
      return filteredUsers;
    },
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      let filteredPosts = posts.filter((post) => {
        let isTitleMatched = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        let isBodyMatched = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatched || isBodyMatched;
      });
      return filteredPosts;
    },
    post: () => {
      return {
        id: "897",
        post: "This is posted by dp",
        postedBy: {
          id: "abd312",
          name: "devendra",
        },
        published: true,
      };
    },
    comments: (parent, args, ctx, info) => {
      return comments; //child resolver for next field author in this case will run for every object when queried
    },
    greeting: (parent, args, ctx, info) => {
      return `hello ${args.name}`;
    },
    addition: (parent, args, ctx, info) => {
      return args.val1 + args.val2;
    },
    grades: (parent, args, ctx, info) => {
      return [99, 12, 10];
    },
  },
  //graphql will call with each post, parent will hold the Post object
  //resolver name author should match the property that has custom type in Post object ie author in this case or posts in User
  //child resolvers in this case
  //if property is not scaler type, we have to teach graphql to return object around that
  Post: {
    author(parent, args, ctx, info) {
      //parent is author in this case
      return users.find((user) => user.id === parent.author);
    },
  },
  User: {
    //child resolvers
    posts(parent, args, ctx, info) {
      //parent is user in this case
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      //parent is user in this case
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      //parent is comment
      return users.find((user) => user.id === parent.author);
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

const BaseServer = server;
export default BaseServer;
