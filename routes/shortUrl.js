const express = require('express')
const route = express.Router()
const fromModule = require('../modules/shortUrl')

route.get('/',fromModule.ShortUrl)

module.exports = route