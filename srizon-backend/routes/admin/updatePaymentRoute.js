'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updatePaymentController');
const router = express.Router();

const {updatePayment} = getData;

router.post('/updatePayment',updatePayment);

module.exports = {
    routes: router
}