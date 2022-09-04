const express = require('express')
const colors = require('colors')
require('dotenv').config()
const schema = require('./schema/schema')
const {graphqlHTTP} = require('express-graphql')

const mongoDB = require('./config/db')

const port = process.env.PORT || 5000
const isDev = process.env.NODE_ENV === 'development'
const app = express()

//connect to db
mongoDB.connectDB()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log('server started on', port)
})
