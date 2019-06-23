const { User }= require('../models');
const jwt = require('jsonwebtoken');

module.exports =(app)=>{

    const signup = (req,res) =>{
        console.log('sign',req.body)
        User.create(req.body, (err,data)=>{
            if (err) {
                res.send({
                    status : false,
                    error : err,
                    message : 'Sign up failed'
                });
                return;
            };
            res.send({
                status : true,
                data : data,
            });
        })
    }

    const login = (req, res) =>{
        const {email, password} = req.body;
        User.findOne({email},(err,data)=>{
            if (err) res.send(err);
            else{
                if (data){
                    if (data.password === password){
                        const payload = {
                            id: data._id
                        }
                        let token = jwt.sign(payload,app.get('superSecret'),{
                            expiresIn : 114
                        });
                        res.send({
                            status : true,
                            message: 'token',
                            token : token
                        })
                    }
                    else {
                        res.send({
                            status: false,
                            data : null,
                            error : true,
                            message : 'Wrong Password'
                        })
                    }
                }else {
                    res.send({
                        status : false,
                        data : null,
                        error : null,
                        message : 'Email does not exist in database, Please Signup'
                    })
                }
            }
        })
    }
    return {
        login,
        signup
    }
}




// function fullName(lastName){
//     return this.firstName + ' ' + lastName;
// }

// //fullName = fullName.bind(user);

// console.log(fullName.apply(user1,['b']));


