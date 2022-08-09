'use strict';

const eventData = require('../../data/events/admin');

const addNewCategory = async (req,res,next) => {
    try {
        let values = req.body;
        const addNewCategory = await eventData.addNewCategory(values);
        if(addNewCategory !== 1){
            res.send({'status' : 502,'message' : 'Something went wrong!!'})
        } else {
            res.send({'status' : 200,'message' : 'Added Successfully!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addNewCategory
}