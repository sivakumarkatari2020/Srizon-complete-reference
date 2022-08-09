'use strict';

const eventData = require('../../data/events/client');

const addCartitem = async (req,res,next) => {
    try{
        const params = req.body;
        console.log(params);
        const addCartitem = await eventData.addCartitem(params);
        console.log(addCartitem);
        res.send(addCartitem);
    } catch (error) {
        res.status(422).send({
            status:422,
            message: error.message,
        })
    }
}

module.exports = {
    addCartitem
}