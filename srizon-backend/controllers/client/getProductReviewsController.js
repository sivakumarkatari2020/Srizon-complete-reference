'use strict';

const eventData = require('../../data/events/client');

const getProductReviews = async (req,res,next) => {
    try {

        const product_id = req.params.product_id;

        const getProductReviews = await eventData.getProductReviews(product_id);

        for(let i=0;i<getProductReviews.length;i++){

            const userDetails = await eventData.getUserDetailsWithID(getProductReviews[i].user_id);
            getProductReviews[i].user_details = userDetails[0];

        }

        
        res.send(getProductReviews);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProductReviews
}