'use strict';

const eventData = require('../../data/events/client');

const getHomeSliders = async (req,res,next) => {
    try {
        const getHomeSliders = await eventData.getHomeSliders();
        res.send(getHomeSliders);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getHomeSliders
}