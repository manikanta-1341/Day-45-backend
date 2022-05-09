const express = require('express')
const route =express.Router()
const fromModule = require('../modules/register')
const fromAuthencate = require('../modules/authenticate')


route.post('/register',fromModule.Register)




route.post('/login',fromAuthencate.Login)
route.get('/verify/:id',fromAuthencate.EmailVerify)
route.put('/forgetpassword',fromAuthencate.Forgetpassword)
route.get('/forgetpassword/verify/:id',fromAuthencate.ForgetPasswordVerify)
route.post('/savepassword/:id',fromAuthencate.savePassword)




module.exports = route