'use strict';

const eventData = require('../../data/events/admin');
const eventData2 = require('../../data/events/client');

const deleteProduct = async (req,res,next) => {
    try {
        let id = req.params.id;
        const getProductDetails = await eventData2.getProductWithID(id);
        if(getProductDetails.length > 0 && getProductDetails[0].inventory_id){
            //const deleteInventory = await eventData.deleteInventory(getProductDetails[0].inventory_id);
            const deleteProduct = await eventData.deleteProduct(id);
            if(deleteProduct.status === 200){
                res.send(deleteProduct);
            }else{
                res.send({'status':422,'data':'Unable to delete'});
            }
        }else{
            const deleteProduct = await eventData.deleteProduct(id);
            res.send(deleteProduct);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    deleteProduct
}