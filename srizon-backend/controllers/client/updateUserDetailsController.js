'use strict';

const eventData = require('../../data/events/client');

const updateUserDetails = async (req,res,next) => {
    try {
        const updateUserDetails = await eventData.updateUserDetails(req.body);
        res.send(updateUserDetails);
    } catch (error) {
        res.status(422).send({
            status: 422,
            message: error.message,
        });
    }
}

module.exports = {
    updateUserDetails
}