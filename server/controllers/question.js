const Question = require('../models/question')

module.exports = {
    getQuestions : (req, res) =>{
        Question.find()
            .then(questions =>{
                res.status(200).json({
                    msg: 'success',
                    questions
                })
                .catch(err=>{
                    console.log("======gagal",err)
                    res.status(500).json(err)
                })
                
            })
    },

    getQuestion: (req, res) =>{
        Question.findOne({_id: req.params.id})
            .then(question =>{
                console.log('=====1====', question)
                res.status(200).json({
                    msg: 'success',
                    question
                })
                .catch(err=>{
                    console.log("======gagal",err)
                    res.status(500).json(err)
                })
            })
    },

    newQuestion : (req, res) =>{
        const {id } = req.user
        console.log('user id', req.user)
        const {title, content } = req.body
        Question.create({
            title,
            content,
            author: id
        })
        .then(newQuestion => {
            console.log('suskesssss', newQuestion)
            res.status(201).json({
                msg: 'success',
                newQuestion
            })
        })
        .catch(err=>{
            console.log("======gagal",err)
            res.status(500).json(err)
        })
    },
    
    updateQuestion: (req, res) =>{
        let {id} = req.user;
        const {title, content} = req.body;
        Question.findOne({_id: req.params.id})
            .then(question =>{
                if(question.author == id){
                    Question.findOneAndUpdate({_id: req.params.id}, {$set:{title:title, content: content}}, {new: true})
                        .then(question =>{
                            console.log('bisa update', question)
                            res.status(200).json({
                                msg: 'success',
                                question
                            })
                        })
                        .catch(err=>{
                            console.log("======gagal",err)
                            res.status(500).json(err)
                        })
                }else{
                    console.log('NOT THE OWNER')
                } 
            })
            .catch(err=>{
                console.log("======gagal",err)
                res.status(500).json(err)
            })
       
    },

    deleteQuestion: (req, res) =>{
        let {id} = req.user;
        Question.findOne({_id: req.params.id})
            .then(question=>{
                if(question.author == id){
                    Question.remove({_id: req.params.id})
                        .then(()=>{
                            console.log("======boleh delete")
                            res.status(200).json({
                                msg: 'success'
                            })
                        })
                        .catch(err=>{
                            console.log("======gagal",err)
                            res.status(500).json(err)
                        })
                } else {
                    console.log('NOT THE OWNER')
                }  
            })
            .catch(err=>{
                console.log("====error===")
                res.status(500).json(err)
            })
    }
}