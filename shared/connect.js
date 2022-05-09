const mongoose= require('mongoose')

module.exports.connect = async(req,res,next)=>{
    try{
        const response = await mongoose.connect(process.env.mongodb_url)
    }
    catch (err) {
        res.send(err)
    }
}