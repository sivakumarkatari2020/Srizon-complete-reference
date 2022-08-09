'use strict';

const eventData = require('../../data/events/client');

const registerUser = async (req,res,next) => {
    try {
        const {email,username,password} = req.body;
        const checkUser = await eventData.checkUser(email);
        if(checkUser.recordsets[0].length === 0){
            const registerUser = await eventData.registerUser(email,username,password);
            res.send(registerUser);
        }else{
            res.send({status:422,message:'This user already exist!!'})
        }
    } catch (error) {
        res.status(422).send({
            status: 422,
            message: error.message,
        });
    }
}

module.exports = {
    registerUser
}