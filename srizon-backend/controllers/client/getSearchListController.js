'use strict';

const eventData = require('../../data/events/client');

const getSearchList = async (req,res,next) => {
    try {

        const key = req.params.key;

        const getSearchList = await eventData.getSearchList(key);
        
        //let list = [];

        //for(let i=0;i<getSearchList.length;i++){
        //    const getProductWithID = await eventData.getProductWithID(getSearchList[i].product_id);
        //    list.push(getProductWithID[0]);
        //}

        res.send(getSearchList);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getSearchList
}