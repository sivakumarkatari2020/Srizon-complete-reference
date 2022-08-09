'use strict';

const eventData = require('../../data/events/client');

const removeWishlistItem = async (req,res,next) => {
    try {
        const user_id = req.params.user_id;
        const wishlist_id = req.params.wishlist_id;
        
        const removeWishlistItem = await eventData.removeWishlistItem(user_id,wishlist_id);
        res.send(removeWishlistItem);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    removeWishlistItem
}