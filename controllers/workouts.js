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
                upperBody: true,
                lowerBody: false,
                cardio: false,
                static: false,
                weightTraining: true,
            }, {
                name: 'Fat Burner',
                date: 6 / 14 / 2020,
                description: 'Bench Runners, Jump Rope, Fast Feet Drop',
                upperBody: false,
                lowerBody: true,
                cardio: true,
                static: true,
                weightTraining: false,
            }, {
                name: 'Honey Buns',
                date: 6 / 16 / 2020,
                description: 'Squats, Lunges, Thrusters',
                upperBody: false,
                lowerBody: true,
                cardio: false,
                static: true,
                weightTraining: false,
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
router.post('/workouts/index', (req, res) => {
    if(req.body.upperBody === 'on'){
        req.body.upperBody = true
    } else {
        req.body.upperBody = false
    }
    if(req.body.lowerBody === 'on'){
        req.body.lowerBody = true
    } else {
        req.body.lowerBody = false
    }
    if(req.body.cardio === 'on'){
        req.body.cardio = true
    } else {
        req.body.cardio = false
    }
    if(req.body.static === 'on'){
        req.body.static = true
    } else {
        req.body.static = false
    }
    if(req.body.weightTraining === 'on'){
        req.body.weightTraining = true
    } else {
        req.body.weightTraining =false
    }
    Workout.create(req.body, (error, createdWorkout)=>{
        res.redirect('/workouts/index');
      })
})

// Show Route
router.get('/workouts/:id', (req, res) =>{
    console.log(Workout)
    Workout.findById(req.params.id, (err, foundWorkout)=>{
      res.render('show.ejs', {
        workouts: foundWorkout,
      })
    })
  })
  router.delete('workouts/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id, (err, deleteWorkout) => {
        res.redirect('/workouts');
    });
});

module.exports = router;
