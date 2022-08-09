'use strict';

const express = require('express');
const getData = require('../../controllers/client/createOrderController');
const router = express.Router();

const {createOrder} = getData;

router.post('/create/orderId',createOrder);

module.exports = {
    routes : router
}