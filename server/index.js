const express = require('express')
require('dotenv').config()
const schema = require('./schema/schema')
const {graphqlHTTP} = require('express-graphql')

const port = process.env.PORT || 5000
const isDev = process.env.NODE_ENV === 'development'
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: isDev
}))

app.listen(port, () => {
    console.log('server started on', port)
})
