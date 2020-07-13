const express = require('express')
const sessionsRouter = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

sessionsRouter.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser
    })
})

sessionsRouter.post('/', (req, res) => {
    //look for a user with the given username
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err)
            res.send('Looks like there is a problem')
        } else if (!foundUser) {
            //let the client know if the user exists
            res.send('<a href="/workoutxpress">Sorry, no user found </a>')
        } else {
            //check the found user's password against input password
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/workoutxpress')
            } else {
                //passwords do not match
                res.send('<a href="/workoutxpress/"> Invalid password </a>')
            }
        }
    })
})

sessionsRouter.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/workoutxpress')
    })
})

module.exports = sessionsRouter