'use strict';

const eventData = require('../../data/events/admin');
const eventData2 = require('../../data/events/client');

const getOrderlist = async (req,res,next) => {
    try {
        const getOrderlist = await eventData.getOrderlist();
        if(getOrderlist.length > 0){
            for(let i=0;i<getOrderlist.length;i++){
                const productDetails = await eventData2.getProductWithID(getOrderlist[i].product_id);
                getOrderlist[i].product_details = productDetails[0];
                const trackingDetails = await eventData2.getTrackingDetailsWithID(getOrderlist[i].track_id);
                getOrderlist[i].tracking_details = trackingDetails[0];
            }
            res.send({status:200,data:getOrderlist});
        }else{
            res.send({'status':422,'message':'Unable to load the order list,Try later!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getOrderlist
}