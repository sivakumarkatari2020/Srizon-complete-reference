'use strict';

const eventData = require('../../data/events/client');

const removeCartlistItem = async (req,res,next) => {
    try {
        const user_id = req.params.user_id;
        const cartitem_id = req.params.cartitem_id;
        
        const removeCartlistItem = await eventData.removeCartlistItem(user_id,cartitem_id);
        res.send(removeCartlistItem);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    removeCartlistItem
}