'use strict';

const eventData = require('../../data/events/client');
const crypto = require('crypto');

const verifyUser = async (req,res,next) => {
    try {
        const {usermail,password} = req.body;
        const verifyUser = await eventData.verifyUser(usermail,password);
        if(verifyUser.status !== 200){
            res.send(verifyUser);
        }else{
            if(verifyUser.data[0].session_token === null){
                let token = crypto.randomBytes(32).toString('hex');
                const updateSessionToken = await eventData.updateSessionToken(token,usermail);
                if(updateSessionToken.rowsAffected[0] === 1){
                    const verifyUser = await eventData.verifyUser(usermail,password);
                    res.send(verifyUser);
                }else{
                    res.send({status:422,message:'Something went wrong,contact admin!!'});
                }
            }else{
                res.send(verifyUser);
            }
        }
    } catch (error) {
        res.status(422).send({
            status: 422,
            message: error.message,
        });
    }
}

module.exports = {
    verifyUser
}