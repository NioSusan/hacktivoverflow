const User = require('../models/user');
const filterBody = require('../middleware/updateAuth');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require("bcryptjs");
const {OAuth2Client} = require('google-auth-library');

module.exports = {
    googleLogin : (req, res) => {
        console.log("a user is registering!!====>",req.body.id_token)
        const token = req.body.id_token;
        const CLIENT_ID = process.env.CLIENT_ID
        const client = new OAuth2Client(CLIENT_ID);
        
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
           
            axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
                .then(userGoogle=>{
                    console.log('======1=====',userGoogle)
                    User.findOne({email: userGoogle.data.email})
                        .then(user =>{
                            if(user!==null){
                                console.log('====2====', user)
                                let token = jwt.sign({id : user._id, email: user.email, role : user.role},  process.env.JWT_SECRET_KEY)
                                res.status(200).json({
                                    msg : `${user.name} has successfully logged in!`,
                                    token,
                                })
                            } else {
                                console.log('====3====')
                                const salt = bcrypt.genSaltSync(10);
                                const hash = bcrypt.hashSync(userGoogle.data.email, salt);
                                User.create({
                                    name : userGoogle.data.name,
                                    email : userGoogle.data.email,
                                    password: hash
                                })
                                .then(newUser=>{
                                    console.log('====4====')
                                    let token = jwt.sign({id : newUser._id, email: newUser.email, role : newUser.role},   process.env.JWT_SECRET_KEY)
                                    res.status(201).json({
                                        msg: `${newUser.name} is successfully registered and logged in`, 
                                        token,
                                    })
                                })
                                .catch(err=>{
                                    console.log('====5====')
                                    res.status(500).json(err)
                                })
                            }
                        })
                        .catch(err=>{
                            console.log('====6====')
                            res.status(500).json(err)
                        })
                })
        }
        verify().catch(console.error);
    },
    login : (req, res) => {
        let { email, password } = req.body;
        console.log("========1=====LOGIN@=========", req.body)
        User.findOne({email: email})
            .then(user =>{
                console.log("========2==============", user)
                isTrue = bcrypt.compareSync(password, user.password)
                console.log("========2==============", isTrue)
                if(isTrue){
                    console.log("========3==============")
                    let token = jwt.sign({ id: user._id, email:user.email, role: user.role }, process.env.JWT_SECRET_KEY)
                    res.status(200).json({
                        msg: `${user.name} is successfully logged in`, 
                        token
                    })
                }else{
                    console.log("========4==============")
                    res.status(400).json({
						msg: "failed to login"
					});
                }   
            })
            .catch(err=>{
                res.status(400).json({
					msg: "check name and password"
				});
            })
    },
    register : (req, res) => {
        let { name, email , password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        User.create({
            name : name,
            email : email,
            password: hash,
        })
        .then(newUser=>{
            console.log('====1====', newUser)
            // let token = jwt.sign({id : newUser._id, email: newUser.email, role : newUser.role},   process.env.JWT_SECRET_KEY)
            res.status(201).json({
                msg: `${newUser.name} is successfully registered`
            })
        })
        .catch(err=>{
            console.log('====2====', err)
            res.status(500).json(err)
        })
    },
}