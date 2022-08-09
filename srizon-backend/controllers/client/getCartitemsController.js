'use strict';

const eventData = require('../../data/events/client');

const getCartitems = async (req,res,next) => {

    const user_id = req.params.user_id;

    try {
        const getCartitems = await eventData.getCartitems(user_id);

        for(let i=0;i<getCartitems.length;i++){
            const getProductWithID = await eventData.getProductWithID(getCartitems[i].product_id);
            const getCartitemDetailsWithID = await eventData.getCartitemDetailsWithID(getCartitems[i].details_id);

            getCartitems[i].product_details = getProductWithID[0];
            getCartitems[i].item_details = getCartitemDetailsWithID[0];
        }

        res.send(getCartitems);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getCartitems
}