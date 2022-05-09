const links = require("../models/links")
const mongoose = require('mongoose')


module.exports.DayCount = async (req, res) => {
    try {
        // console.log("in count")
        
        let Dayresponse = await links.find({}, { _id: 0, createdAt: 1 })

        let linksInDays = Dayresponse.map((el) => {
            return el.createdAt.filter((e) => e.substring(0,10) === new Date().toISOString().substring(0,10)).length
        }).reduce((acc, cv) => acc+cv)

        let month = new Date().getMonth()+1
        
        let year =new Date().getFullYear()

        if(parseInt(month)<10){
            var Monthresponse = await links.find({createdAt : {$gte :`${year}-0${month}-01` , $lt : `${year}-0${month+1}-01` }},{_id : 0 , createdAt :1})
        }
        else{
            var Monthresponse = await links.find({createdAt : {$gte :`${year}-${month}-01` , $lt : `${year}-${month+1}-01` }},{_id : 0 , createdAt :1})
        }

        let Yearresponse = await links.find({createdAt : {$gte :`${year}-01-01` , $lt : `${year+1}-01-01` }},{_id : 0 , createdAt :1})
        
        let linksInMonths = Monthresponse.map((el) => {
            return el.createdAt.filter((e) => e.substring(0,10)>=`${year}-0${month}-01` && e.substring(0,10) <  `${year}-0${month+1}-01` ).length
        }).reduce((acc, cv) => acc+cv)

        let linksInYears = Yearresponse.map((el) => {
            return el.createdAt.filter((e) => e.substring(0,10)>=`${year}-01-01` && e.substring(0,10) <  `${year+1}-01-01` ).length
        }).reduce((acc, cv) => acc+cv)

        // console.log(month,`${year}-0${month}-01`,`${year}-0${month+1}-01`,year)
        
        res.send({ year : linksInYears  ,month :  linksInMonths ,day : linksInDays })
        // res.send({result : linksInDays})
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
}

module.exports.MonthCount = async (req, res, next) => {
    try{
        
    }
    catch (err) {

    }
}