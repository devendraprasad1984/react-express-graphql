const mongoose = require('mongoose')

//mongoose schema is not related to graphql schema
//this are DB models
const ClientSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String}
})

module.exports = mongoose.model('client', ClientSchema)
