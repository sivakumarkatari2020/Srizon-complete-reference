'use strict';

const eventData = require('../../data/events/client');

const addWishlistItem = async (req,res,next) => {
    try{
        const params = req.body;
        const addWishlistItem = await eventData.addWishlistItem(params);
        res.send(addWishlistItem);
    } catch (error) {
        res.status(422).send({
            status:422,
            message: error.message,
        })
    }
}

module.exports = {
    addWishlistItem
}