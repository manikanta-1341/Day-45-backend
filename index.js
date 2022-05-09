const express = require('express')
const connection = require('./shared/connect')
const singModule = require('./routes/sign')
const linkModule = require('./routes/links')
const shortUrlModule = require('./routes/shortUrl')
const links = require('./models/links')
const dotenv = require('dotenv')
const cors = require('cors')
const app =express()

dotenv.config()
connection.connect()
app.use(express.json())
app.use(cors())

app.use('/',(req,res,next)=>{
  next();
})

app.use('/',singModule)
app.use('/links',linkModule)


app.get('/:string',async (req, res) => {
  let api = await links.findOne({short_url : req.params.string})
  // console.log(api)
  let response = api.url[api.short_url.indexOf(req.params.string)]
  // console.log(response)
  res.redirect(`https://${response}`)
})
app.post('/:string',async (req, res) => {
  let api = await links.findOne({short_url : req.params.string})
  // console.log("api:::",api)
  let response = api.short_url.indexOf(req.params.string)
  // console.log("response:::",response)
  api.clicks[response] = api.clicks[response]+1
  let result = await api.save()
  // console.log("result::::",result)
  res.send(result)
})



app.listen(process.env.PORT || 5000)