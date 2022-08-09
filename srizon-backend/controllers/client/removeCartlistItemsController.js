'use strict';

const eventData = require('../../data/events/client');

const removeCartlistItems = async (req,res,next) => {
    try {
        const user_id = req.params.user_id;
        
        const removeCartlistItems = await eventData.removeCartlistItems(user_id);
        res.send(removeCartlistItems);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    removeCartlistItems
}