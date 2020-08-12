const express = require('express')
const router = express.Router()
const userWorkout = require('../models/user_workouts')
const Workout = require('../models/workout')
const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/users/new')
    }
}

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
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
    
})

// Index Route
router.get('/workouts', isAuthenticated, (req, res) => {
    userWorkout.find({currentUser: req.session.currentUser}, (error, allWorkouts) => {
        // console.log('this is req.session' + req.session)
        req.session.anyProperty = 'any value'
        console.log(req.session)
        res.render('index.ejs', {
            workouts: allWorkouts,
            currentUser: req.session.currentUser
        })
    })
})
// New Route
router.get('/new', isAuthenticated, (req, res) => {
    res.render('new.ejs', {
        currentUser: req.session.currentUser
    })
})

// Post Route
router.post('/workouts', isAuthenticated, (req, res) => {
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
        if (error) {
            console.log(error)
            return
        }
        // console.log('hello', req.session.currentUser)
        // const userWorkout = {
        //     user_id: req.session.currentUser._id,
        //     workouts_id: createdWorkout._id.toString(),
        //     name: createdWorkout.name,
        //     date: createdWorkout.date
        // }
        // console.log(userWorkout)
        // userWorkout.create(userWorkout, (err, userWorkoutCreated) => {
        //     if (err) {
        //         console.log('this sucks')
        //     }
        //     console.log(userWorkoutCreated)
        // })
        res.redirect('/workoutxpress/workouts');
      })
})

// Show Route
router.get('/workouts/:id', isAuthenticated, (req, res) =>{
    //console.log(Workout)
    Workout.findById(req.params.id, (err, foundWorkout)=>{
      res.render('show.ejs', {
        workouts: foundWorkout,
        currentUser: req.session.currentUser
      })
    })
  })
  // Edit Route
  router.get('/workouts/:id/edit', isAuthenticated, (req, res) => {
      //console.log('test')
    Workout.findById(req.params.id, (err, foundWorkout) => {
        res.render('edit.ejs', {
            workouts: foundWorkout,
            currentUser: req.session.currentUser
        })
    })
})
// Update Route
  router.put('/workouts/:id', isAuthenticated, (req, res) => {
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
  router.delete('/workouts/:id', isAuthenticated, (req, res) => {
      //console.log('test')
    Workout.findByIdAndRemove(req.params.id, (err, deleteWorkout) => {
        res.redirect('/workoutxpress/workouts')
    })
})

// async function createUserWorkout (workout, userId) {
//     await userWorkout.create()
// }

module.exports = router;

