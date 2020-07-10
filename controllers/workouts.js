const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')

// Seed Route
router.get('/seed', async (req, res) => {
    const pastWorkouts =
        [
            {
                name: 'Heavy lifting',
                date: 'Thurs Jan 1 2020',
                description: '2 reps of bench press, 2 reps of arm curls, 2 reps of tricep extensions',
                upperBody: true,
                lowerBody: false,
                cardio: false,
                static: false,
                weightTraining: true,
            }, {
                name: 'Fat Burner',
                date: 'Fri Jan 25 2020',
                description: 'Bench Runners, Jump Rope, Fast Feet Drop',
                upperBody: false,
                lowerBody: true,
                cardio: true,
                static: true,
                weightTraining: false,
            }, {
                name: 'Honey Buns',
                date: 'Mon June 1 2020',
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
router.get('/workouts', (req, res) => {
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
router.post('/workouts', (req, res) => {
    //console.log(req.body)
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
        res.redirect('/workoutxpress/workouts');
      })
})

// Show Route
router.get('/workouts/:id', (req, res) =>{
    //console.log(Workout)
    Workout.findById(req.params.id, (err, foundWorkout)=>{
      res.render('show.ejs', {
        workouts: foundWorkout,
      })
    })
  })
  // Edit Route
  router.get('/workouts/:id/edit', (req, res) => {
      //console.log('test')
    Workout.findById(req.params.id, (err, foundWorkout) => {
        res.render('edit.ejs', {
            workouts: foundWorkout
        })
    })
})
// Update Route
  router.put('/workouts/:id', (req, res) => {
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
    Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedWorkout) => {
        if (err){
            console.log(err)
        } else {
            res.redirect('/workoutxpress/workouts');
        }
    });
});
  // Delete Route
  router.delete('/workouts/:id', (req, res) => {
      //console.log('test')
    Workout.findByIdAndRemove(req.params.id, (err, deleteWorkout) => {
        res.redirect('/workoutxpress/workouts')
    })
})

module.exports = router;

