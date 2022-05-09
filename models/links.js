const mongoose = require('mongoose')
const schema = mongoose.Schema,
ObjectId = schema.ObjectId
const linksSchema = new schema({
    id:{
        type:ObjectId,
        required: true
    },
    url:{
        type:Array,
        required: true
    },
    short_url:{
        type:Array,
        required:true
    },
    clicks : {
        type:Array,
        required:true
    },
    createdAt:{
        type:Array,
        required:true
    }
})

module.exports = mongoose.model('links',linksSchema)