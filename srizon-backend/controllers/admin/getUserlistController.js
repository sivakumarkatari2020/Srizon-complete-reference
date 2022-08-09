'use strict';

const eventData = require('../../data/events/admin');

const getUserlist = async (req,res,next) => {
    try {
        const getUserlist = await eventData.getUserlist();
        res.send(getUserlist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUserlist
}