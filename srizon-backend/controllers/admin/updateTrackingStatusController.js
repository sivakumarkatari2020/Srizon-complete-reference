'use strict';

const eventData = require('../../data/events/admin');

const updateTrackingStatus = async (req,res,next) => {
    try {
        let values = req.body;
        const updateTrackingStatus = await eventData.updateTrackingStatus(values);
        if(updateTrackingStatus !== 1){
            res.send({'status' : 502,'message' : 'Something went wrong!!'})
        } else {
            res.send({'status' : 200,'message' : 'Updated Successfully!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    updateTrackingStatus
}