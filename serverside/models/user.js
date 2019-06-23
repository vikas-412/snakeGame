const mongoose = require("mongoose");

const validateEmail = (email) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name!']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate : [validateEmail , 'Please fill a valid email address'],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : String,
        required : true
    },
    highestScore : {
        type : Number,
        default : 0
    },
    timesPlayed: {
        type :Number,
        default : 0
    }
    // totalTimePlayed:{}
});

const User = mongoose.model('user', userSchema);

module.exports = User;