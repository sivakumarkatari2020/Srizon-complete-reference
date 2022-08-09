'use strict';

const eventData = require('../../data/events/client');

const getLatest10Products = async (req,res,next) => {
    try {
        const getLatest10Products = await eventData.getLatest10Products();
        res.send(getLatest10Products);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getLatest10Products
}