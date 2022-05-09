const express = require('express')
const route =express.Router()
const fromModule = require('../modules/links')
const fromCount = require('../modules/counting')

route.get('/daycount',fromCount.DayCount)
route.get('/:id',fromModule.Get)
route.post('/:id',fromModule.Create)



module.exports = route