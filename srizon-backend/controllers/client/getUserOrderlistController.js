'use strict';

const eventData = require('../../data/events/client');

const getUserOrderlist = async (req,res,next) => {
    try {

        const user_id = req.params.user_id;

        const getOrderDetails = await eventData.getOrdersWithID(Number(user_id));

        if(getOrderDetails.length > 0){
            for(let i=0;i<getOrderDetails.length;i++){
                const getShippingDetails = await eventData.getShippingDetailsWithID(getOrderDetails[i].shipping_id);
                getOrderDetails[i].shipping_details = getShippingDetails[0];

                const getTrackingDetailsWithID = await eventData.getTrackingDetailsWithID(getOrderDetails[i].track_id);
                getOrderDetails[i].tracking_details = getTrackingDetailsWithID[0];

                const getProductDetails = await eventData.getProductWithID(getOrderDetails[i].product_id);
        
                if(getProductDetails.length > 0){                    
                    if(getProductDetails[0].category_id !== null){
                        const getCategoryDetails = await eventData.getCategoryWithID(getProductDetails[0].category_id);
                        getProductDetails[0].category_details = getCategoryDetails[0];
                    }
                
                    if(getProductDetails[0].inventory_id !== null){
                        const getInventoryDetails = await eventData.getInventoryWithID(getProductDetails[0].inventory_id);
                        getProductDetails[0].inventory_details = getInventoryDetails[0];
                    }
                }

                getOrderDetails[i].product_details = getProductDetails[0];
            }

            res.send(getOrderDetails);
        }else{
            res.send(getOrderDetails);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUserOrderlist
}