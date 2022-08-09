'use strict';

const eventData = require('../../data/events/client');

const getCategoryProducts = async (req,res,next) => {
    try {

        const category_id = req.params.category_id;

        const getCategoryProducts = await eventData.getCategoryProducts(category_id);
        
        //let list = [];

        //for(let i=0;i<getCategoryProducts.length;i++){
        //    const getProductWithID = await eventData.getProductWithID(getCategoryProducts[i].product_id);
        //    list.push(getProductWithID[0]);
        //}

        res.send(getCategoryProducts);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getCategoryProducts
}