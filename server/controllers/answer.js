const Answer = require('../models/answer')
const Question = require('../models/question')

module.exports = {
    getAnswers : (req, res) =>{
        Answer.find()
            .then(answers =>{
                res.status(200).json({
                    msg: 'success',
                    answers
                })
                .catch(err=>{
                    console.log("======gagal",err)
                    res.status(500).json(err)
                })
                
            })
    },

    getAnswer : (req, res) =>{
        Answer.findOne({_id: req.params.id})
            .then(answer =>{
                console.log('=====1====', answer)
                res.status(200).json({
                    msg: 'success',
                    answer
                })
                .catch(err=>{
                    console.log("======gagal",err)
                    res.status(500).json(err)
                })
            })
    },

    newAnswer : (req, res) =>{
        const { id } = req.user
        console.log('user id', req.user)
        const { questionId, content } = req.body
        Answer.create({
            content,
            author: id
        })
        .then(newAnswer => {
            console.log('suskesssss', newAnswer)
            Question.findOneAndUpdate({ _id: questionId }, { $push: { answers: newAnswer._id } })
					.then(success => {
                        console.log('suskesssss', success)
						res.status(201).json({
							message: "success to add an answer",
							newAnswer,
							success
						});
					})
					.catch(err => {
						res.status(500).json({
							err
						});
					});
        })
        .catch(err=>{
            console.log("======gagal",err)
            res.status(500).json(err)
        })
    },
    
    updateAnswer : (req, res) =>{
        const { id } = req.user
        Answer.findOne({_id: req.params.id})
            .then(answer=>{
                if(answer.author == id){
                    Answer.findOneAndUpdate({_id: req.params.id}, {$set:req.body}, {new: true})
                        .then(answer =>{
                            console.log('bisa update', answer)
                            res.status(200).json({
                                msg: 'success',
                                answer
                            })
                        })
                        .catch(err=>{
                            console.log("======gagal",err)
                            res.status(500).json(err)
                        })
                }
            })
    }
}