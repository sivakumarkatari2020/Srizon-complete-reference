'use strict';

const eventData = require('../../data/events/client');

const getProductDetails = async (req,res,next) => {
    try {

        const product_id = req.params.product_id;

        const getProductDetails = await eventData.getProductWithID(product_id);
        
        for(let i=0;i<getProductDetails.length;i++){

            if(getProductDetails[i].category_id !== null){
                const getCategoryDetails = await eventData.getCategoryWithID(getProductDetails[i].category_id);
                getProductDetails[i].category_details = getCategoryDetails[0];
            }

            if(getProductDetails[i].inventory_id !== null){
                const getInventoryDetails = await eventData.getInventoryWithID(getProductDetails[i].inventory_id);
                getProductDetails[i].inventory_details = getInventoryDetails[0];
            }

        }

        res.send(getProductDetails);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProductDetails
}