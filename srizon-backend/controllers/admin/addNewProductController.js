'use strict';

const eventData = require('../../data/events/admin');

const addNewProduct = async (req,res,next) => {
    try {
        let values = req.body;
        const addNewProduct = await eventData.addNewProduct(values);
        if(addNewProduct !== 1){
            res.send({'status' : 502,'message' : 'Something went wrong!!'})
        } else {
            res.send({'status' : 200,'message' : 'Added Successfully!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addNewProduct
}