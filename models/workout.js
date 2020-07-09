const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, required: true},
    description: String,
    targetArea: [String],
    // upperBody: { type: Boolean, default: false },
    // lowerBody: { type: Boolean, default: false },
    // cardio: { type: Boolean, default: false },
    // static: { type: Boolean, default: false },
    // weightTraining: { type: Boolean, default: false },

})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout