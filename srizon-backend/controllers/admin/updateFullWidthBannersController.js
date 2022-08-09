'use strict';

const eventData = require('../../data/events/admin');

const updateFullWidthBanners = async (req,res,next) => {
    try {
        let values = req.body;
        const updateFullWidthBanners = await eventData.updateFullWidthBanners(values);
        if(updateFullWidthBanners !== 1){
            res.send({'status' : 502,'message' : 'Something went wrong!!'})
        } else {
            res.send({'status' : 200,'message' : 'Updated Successfully!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    updateFullWidthBanners
}