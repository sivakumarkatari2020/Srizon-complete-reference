'use strict';

const eventData = require('../../data/events/admin');
const eventData2 = require('../../data/events/client');

const getProductlist = async (req,res,next) => {
    try {
        const getProductlist = await eventData.getProductlist();
        if(getProductlist.status === 200){
            for(let i=0;i<getProductlist.data.length;i++){
                const inventoryDetails = await eventData2.getInventoryWithID(getProductlist.data[i].inventory_id);
                getProductlist.data[i].inventory_details = inventoryDetails[0];
            }
            res.send({status:200,data:getProductlist.data});
        }else{
            res.send({'status':422,'message':'Unable to load the product list,Try later!!'});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getProductlist
}