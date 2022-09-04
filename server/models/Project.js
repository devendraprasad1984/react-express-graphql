const mongoose = require('mongoose')

//this are DB models
//mongoose schema is not related to graphql schema
const ProjectSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    status: {
        type: String,
        enum: ['Not started', 'In progress', 'Completed']
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
})

module.exports = mongoose.model('project', ProjectSchema)

