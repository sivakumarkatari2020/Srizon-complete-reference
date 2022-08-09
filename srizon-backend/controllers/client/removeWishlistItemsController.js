'use strict';

const eventData = require('../../data/events/client');

const removeWishlistItems = async (req,res,next) => {
    try {
        const user_id = req.params.user_id;
        
        const removeWishlistItems = await eventData.removeWishlistItems(user_id);
        res.send(removeWishlistItems);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    removeWishlistItems
}