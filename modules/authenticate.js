const Users = require('../models/register')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('nodemailer')
const mongoose = require('mongoose')

module.exports.Login = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const user = await Users.findOne({ username: username })
        if (user) {
            const token = jwt.sign({user}, process.env.SECRET_KEY, { expiresIn: "1hr" })
            if(user.verification === "yes"){
                const isvalid = await bcrypt.compare(password, user.password)
                if (isvalid) {
                    res.send(token)
                }
                else {
                    res.send({ msg: "invalid password" })
                }
            }
            else{
                var transporter = mailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'office@gmail.com',
                        pass: 'office@123'
                    }
                });
                let info = await transporter.sendMail({
                    from: 'office@gmail.com',
                    to: user.username,
                    subject: "Email Verification",
                    text: `http://localhost:5000/verify/${user._id}/?s=${token}`,
                }, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.send({ msg: "verify  your email"})
            }
        }
        else {
            res.send({ msg: "invalid username" })
        }
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }

}

module.exports.EmailVerify = async (req, res, next) => {
    try{
        let response = await Users.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id)},{$set : {verification: "yes"}})
        // console.log(response)
        res.redirect('http://localhost:3000/activated')
    }
    catch (err) {
        res.send(err)
    }
}


module.exports.Forgetpassword = async (req, res, next) => {
    try {
        const email = req.body.email
        const user = await Users.findOne({ username : email })
        // console.log('user', user)
        if (user) {
            // console.log('in fp ')
            const randomString = await bcrypt.genSalt(7)
            const token = jwt.sign({ randomString }, process.env.RESET_KEY, { expiresIn: '10m' })
            // console.log(token)
            let user_update = await Users.findOneAndUpdate({ _id: user._id }, { $set: { rndString: token } })
            let result = await user_update.save()
            var transporter = mailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'office@gmail.com',
                    pass: 'office@123'
                }
            });
            let info = await transporter.sendMail({
                from: 'office@gmail.com',
                to: user.username,
                subject: "Password Reset",
                text: `http://localhost:5000/forgetpassword/verify/${user._id}/?s=${token}`,
            }, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.status(200).send("success")
        }
        else {
            res.status(404).send(user)
        }
    }
    catch (err) {
        console.log(err)
        res.send("failed")
    }

}


module.exports.ForgetPasswordVerify = async (req, res, next) => {
    try {
        const tokenFromUser = req.query.s
        const user = await Users.findById({ _id: mongoose.Types.ObjectId(req.params.id) })
        // console.log(tokenFromUser, "\n", user, "\n", user.rndString)
        if (tokenFromUser === user.rndString) {
            res.redirect(`http://localhost:3000/resetpassword/${req.params.id}/?s=${req.query.s}`)
        }
        else{
            res.send("Token Not Matched / Token Expired")
        }
    }
    catch (err) {
        res.send(err)
    }
}


module.exports.savePassword = async (req, res, next) => {
    // console.log("in savePassword")
    try{
        const string = await bcrypt.genSalt(6)
        console.log("in save",req.body.password)
        const hashPassword = await bcrypt.hash(req.body.password, string)
        await Users.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { password: hashPassword } })
        await Users.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $unset: { rndString: '' } })
        res.send({msg : "saved successfully"})
        // res.redirect('http://localhost:3000/success')
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
    // const string = await bcrypt.genSalt(6)
    // console.log("in save",req.body.password)
    // const hashPassword = await bcrypt.hash(req.body.password, string)
    // try {
    //     let response = await Users.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { password: hashPassword } })
    //     if (response) {
    //         await Users.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { $unset: { rndString: '' } })
    //         res.redirect('http://localhost:3000/success')
    //     }
    // }
    // catch (err) {
    //     res.send(err)
    // }
    
}