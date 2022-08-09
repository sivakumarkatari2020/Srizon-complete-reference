'use strict';

const eventData = require('../../data/events/client');

const getDealsOfTheDay = async (req,res,next) => {
    try {
        const getDealsOfTheDay = await eventData.getDealsOfTheDay();
        res.send(getDealsOfTheDay);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getDealsOfTheDay
}