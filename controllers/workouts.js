const express = require('express')
const router = express.Router()

const Workout = require('../models/workout')

// Landing Route
router.get('/', (req, res) => {
    res.send('pump it up')
})

module.exports = router;