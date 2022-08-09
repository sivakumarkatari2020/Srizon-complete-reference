'use strict';

const eventData = require('../../data/events/admin');

const updateDeliveryStatus = async (req,res,next) => {
    try {
        let values = req.body;
        const updateDeliveryStatus = await eventData.updateDeliveryStatus(values);
        if(updateDeliveryStatus !== 1){
            res.send({'status' : 502,'message' : 'Something went wrong!!'})
        } else {
            res.send({'status' : 200,'message' : 'Updated Successfully!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    updateDeliveryStatus
}