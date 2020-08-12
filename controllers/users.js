const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users.js')

userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser
    })
})

userRouter.post('/', (req, res) => {
    //hash the pswd before putting in the db
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) => {
        console.log('account created', createdUser)
        res.redirect('/workoutxpress')
    })
})
module.exports = userRouter