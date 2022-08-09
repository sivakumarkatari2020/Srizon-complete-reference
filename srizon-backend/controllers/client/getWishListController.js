'use strict';

const eventData = require('../../data/events/client');

const getWishList = async (req,res,next) => {
    try {

        const user_id = req.params.user_id;

        const getWishList = await eventData.getWishList(user_id);

        for(let i=0;i<getWishList.length;i++){
            const getProductWithID = await eventData.getProductWithID(getWishList[i].product_id);

            
            if(getProductWithID[0].category_id !== null){
                const getCategoryDetails = await eventData.getCategoryWithID(getProductWithID[0].category_id);
                if(getCategoryDetails.length > 0) getProductWithID[0].category_details = getCategoryDetails[0];
            }
            
            if(getProductWithID[0].inventory_id !== null){
                const getInventoryDetails = await eventData.getInventoryWithID(getProductWithID[0].inventory_id);
                if(getInventoryDetails.length > 0) getProductWithID[0].inventory_details = getInventoryDetails[0];
            }

            getWishList[i].product_details = getProductWithID[0];
        }

        res.send(getWishList);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getWishList
}