'use strict';

const eventData = require('../../data/events/client');

const restoreQuantity = async (req,res,next) => {
    try {
        const restoreQuantity = await eventData.restoreQuantity(req.body);
        res.send(restoreQuantity);
    } catch (error) {
        res.status(422).send({
            status: 422,
            message: error.message,
        });
    }
}

module.exports = {
    restoreQuantity
}