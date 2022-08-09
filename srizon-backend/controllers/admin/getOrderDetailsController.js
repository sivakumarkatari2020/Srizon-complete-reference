'use strict';

const eventData = require('../../data/events/admin');
const eventData2 = require('../../data/events/client');

const getOrderDetails = async (req,res,next) => {
    try {
        let {id} = req.params;
        const getOrderDetails = await eventData.getOrderDetails(id);
        if(getOrderDetails.length > 0){
            const productDetails = await eventData2.getProductWithID(getOrderDetails[0].product_id);
            const trackingDetails = await eventData2.getTrackingDetailsWithID(getOrderDetails[0].track_id);
            const shippingDetails = await eventData2.getShippingDetailsWithID(getOrderDetails[0].shipping_id);

            if(productDetails.length > 0 && trackingDetails.length > 0 && shippingDetails.length > 0){
                getOrderDetails[0].product_details = productDetails[0];
                getOrderDetails[0].tracking_details = trackingDetails[0];
                getOrderDetails[0].shipping_details = shippingDetails[0];
                res.send({status:200,data:getOrderDetails});
            }else{
                res.send({status:422,message:'Unable to get the order data,Try later!!'});
            }
        }else{
            res.send({'status':422,'message':'Unable to load the order data,Try later!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getOrderDetails
}