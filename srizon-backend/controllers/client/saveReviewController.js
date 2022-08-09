'use strict';

const eventData = require('../../data/events/client');

const saveReview = async (req,res,next) => {
    try {
        let {order_id,rating,review} = req.body;
        const getOrderDetails = await eventData.getOrderDetails(order_id);
        if(getOrderDetails.recordset !== undefined && getOrderDetails.recordset.length > 0){
            const saveReview = await eventData.saveReview({
                'product_id' : getOrderDetails.recordset[0].product_id,
                'user_id' : getOrderDetails.recordset[0].user_id,
                'rating' : rating,
                'review' : review
            });
            if(saveReview.status === 200){
                await eventData.updateRating({
                    'product_id' : getOrderDetails.recordset[0].product_id,
                    'rating' : rating
                })
            }
            res.send(saveReview);
        }else{
            res.send({status:422,message:'Unable to save your review,try again later!!'});
        }
    } catch (error) {
        res.status(422).send({
            status: 422,
            message: error.message,
        });
    }
}

module.exports = {
    saveReview
}