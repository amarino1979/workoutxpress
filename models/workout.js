const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, required: true},
    description: String,
    upperBody: { type: Boolean, default: true },
    lowerBody: { type: Boolean, default: true },
    cardio: { type: Boolean, default: true },
    static: { type: Boolean, default: true },
    weightTraining: { type: Boolean, default: true },

})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout