'use strict';

const eventData = require('../../data/events/client');

const getBestSellers = async (req,res,next) => {
    try {
        const getBestSellers = await eventData.getBestSellers();
        let list = [];

        for(let i=0;i<getBestSellers.length;i++){
            const getProductWithID = await eventData.getProductWithID(getBestSellers[i].product_id);
            list.push(getProductWithID[0]);
        }

        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getBestSellers
}