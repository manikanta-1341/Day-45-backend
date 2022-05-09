const mongoose = require('mongoose')
const schema = mongoose.Schema

const UserSchema= new schema({
    username:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verification:{
        type:String,
        default:"no"

    },
    rndString:{
        type : String
    }

})

const Users = mongoose.model('users' , UserSchema)
module.exports = Users