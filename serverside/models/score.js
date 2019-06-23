const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    score : {
        type : Number,
        required: true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    timeTaken : { //endtime - start time
        type : Date,
        default : Date.now()
    }
})

const Score = mongoose.model('score', scoreSchema);

module.exports = Score;