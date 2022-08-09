'use strict';

const eventData = require('../../data/events/admin');

const getUserDetails = async (req,res,next) => {
    try {

        let id = req.params.user_id;

        const getUserDetails = await eventData.getUserDetails(id);
        res.send(getUserDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUserDetails
}