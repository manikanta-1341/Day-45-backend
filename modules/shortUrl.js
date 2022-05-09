const links = require('../models/links')



module.exports.ShortUrl = async (req, res) => {
    let response = await links.findOne({short_url : req.params.string})
    // console.log("res in short_url::",req.params,response) 
    res.send(response)
}