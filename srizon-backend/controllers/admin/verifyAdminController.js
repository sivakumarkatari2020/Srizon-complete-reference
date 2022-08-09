'use strict';

const eventData = require('../../data/events/admin');

const verifyAdmin = async (req,res,next) => {
    try {
        const {usermail,password} = req.body;
        console.log(usermail,password)
        const verifyAdmin = await eventData.verifyAdmin(usermail,password);
        res.send(verifyAdmin);
    } catch (error) {
        res.status(422).send({
            status: 422,
            message: error.message,
        });
    }
}

module.exports = {
    verifyAdmin
}