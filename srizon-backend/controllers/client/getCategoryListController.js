'use strict';

const eventData = require('../../data/events/client');

const getCategoryList = async (req,res,next) => {
    try {

        const getCategoryList = await eventData.getCategoryList();
        res.send(getCategoryList);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getCategoryList
}