let mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    answers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Answer"
    }]
}, {timestamps: true});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;