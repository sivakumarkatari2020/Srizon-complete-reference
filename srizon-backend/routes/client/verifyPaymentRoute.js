'use strict';

const express = require('express');
const getData = require('../../controllers/client/verifyPaymentController');
const router = express.Router();

const {verifyPayment} = getData;

router.post('/payment/verify',verifyPayment)

module.exports = {
    routes: router
}