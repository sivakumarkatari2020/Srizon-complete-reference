'use strict';

const express = require('express');
const getData = require('../../controllers/client/cancelOrderController');
const router = express.Router();

const {cancelOrder} = getData;

router.get('/cancelOrder/:order_id',cancelOrder);

module.exports = {
    routes : router
}