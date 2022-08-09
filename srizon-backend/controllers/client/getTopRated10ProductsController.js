'use strict';

const eventData = require('../../data/events/client');

const getTopRated10Products = async (req,res,next) => {
    try {
        const getTopRated10Products = await eventData.getTopRated10Products();
        res.send(getTopRated10Products);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTopRated10Products
}