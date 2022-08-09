'use strict';

const eventData = require('../../data/events/client');

const getWrappBanners = async (req,res,next) => {
    try {
        const getWrappBanners = await eventData.getWrappBanners();
        res.send(getWrappBanners);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getWrappBanners
}