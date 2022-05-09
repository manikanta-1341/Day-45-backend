const links = require('../models/links')
const mongoose = require('mongoose')
const short_id = require('shortid')


module.exports.Create = async (req, res) => {
    try {
        let check = await links.findOne({ id: mongoose.Types.ObjectId(req.params.id) })
        if (check == null) {
            let id = mongoose.Types.ObjectId(req.params.id)
            let link = new links({ id: id })
            link.short_url.push(short_id.generate())
            link.url.push(req.body.url)
            link.clicks.push(0)
            link.createdAt.push(new Date().toISOString())
            let response = await link.save()
            res.send(response)
        }
        else{
            // console.log("in else create")
            let id = mongoose.Types.ObjectId(req.params.id)
            // console.log(id)
            // let response = await links.findOne({id : mongoose.Types.ObjectId(req.params.id)})
            let response = await links.findOneAndUpdate({id : mongoose.Types.ObjectId(req.params.id)},{$push:{
                url :req.body.url,
                short_url : short_id.generate(),
                clicks : 0,
                createdAt : new Date().toISOString()
            }})
            console.log(response)
            res.send(response)
        }
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

}

module.exports.Get = async (req, res) => {
    // console.log("in get func")
    let response = await links.findOne({id : mongoose.Types.ObjectId(req.params.id)})
    // console.log(response)
    res.send(response)
}

