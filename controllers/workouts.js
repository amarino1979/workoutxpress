const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')

// Seed Route
router.get('/seed', async (req, res) => {
    const pastWorkouts =
        [
            {
                name: 'Heavy lifting',
                date: 6 / 12 / 2020,
                description: '2 reps of bench press, 2 reps of arm curls, 2 reps of tricep extensions',
                targetArea: ['Upper body', 'Weight training'],
            }, {
                name: 'Fat Burner',
                date: 6 / 14 / 2020,
                description: 'Bench Runners, Jump Rope, Fast Feet Drop',
                targetArea: ['Cardio'],
            }, {
                name: 'Honey Buns',
                date: 6 / 16 / 2020,
                description: 'Squats, Lunges, Thrusters',
                targetArea: ['Lower body', 'Static'],
            }
        ]
    try {
        const seedItems = await Workout.create(pastWorkouts)
        res.send(seedItems)
    } catch (err) {
        res.send(err.message)
    }
})


// Landing Route
router.get('/', (req, res) => {
    res.render('home.ejs')
})

// Index Route
router.get('/index', (req, res) => {
    Workout.find({}, (error, allWorkouts) => {
        res.render('index.ejs', {
            workouts: allWorkouts
        })
    })
})
// New Route
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// Post Route
router.post('/index', (req, res) => {
    Workout.create(req.body, (error, createdWorkout)=>{
        res.redirect('/index');
      })
})
module.exports = router;