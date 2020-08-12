const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userWorkoutSchema = Schema({
    user_id: {type: String},
    workouts_id: {type: String},
    name: {type: String},
    date: { type: Date, required: true},
})

const userWorkout = mongoose.model('userWorkout', userWorkoutSchema)

module.exports = userWorkout