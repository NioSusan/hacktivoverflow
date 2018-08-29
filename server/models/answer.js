let mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
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
}, {timestamps: true});

const Answer= mongoose.model('Answer', answerSchema);

module.exports = Answer;