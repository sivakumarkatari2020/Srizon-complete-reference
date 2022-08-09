'use strict';

const eventData = require('../../data/events/admin');

const deleteUser = async (req,res,next) => {
    try {
        let id = req.params.id;
        const deleteUser = await eventData.deleteUser(id);
        res.send(deleteUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    deleteUser
}