'use strict';

const eventData = require('../../data/events/client');

const cancelOrder = async (req,res,next) => {
    try {
        let {order_id} = req.params;
    
        const getOrderDetails = await eventData.getOrderDetails(order_id);
        if(getOrderDetails?.recordset !== undefined){

            const getProductWithID = await eventData.getProductWithID(getOrderDetails.recordset[0].product_id);
            if(getProductWithID.length > 0){

                const restoreQuantity = await eventData.restoreQuantity({
                    'inventory_id':getProductWithID[0].inventory_id,
                    'units':getOrderDetails.recordset[0].quantity
                });
                if(restoreQuantity.status !== 200){
                    res.send({status:422,message:'Error in restoring the quantity,try later!!'});
                }else{
                    const updatePaymentStatus = await eventData.updatePaymentStatus(order_id);
                    console.log(updatePaymentStatus);
                    const cancelOrder = await eventData.cancelOrder({
                        'order_id':order_id,
                        'track_id':getOrderDetails.recordset[0].track_id
                    });
                    res.send(cancelOrder);
                }   

            }else{
                res.send({status:422,message:'Error in cancelling your order,try later!!'});
            }
        }else{
            res.send({status:422,message:'Error in cancelling your order,try later!!'});
        }
        /*
        */
    } catch (error) {
        res.status(422).send({
            status: 422,
            message: error.message,
        });
    }
}

module.exports = {
    cancelOrder
}