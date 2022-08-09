'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updateDeliveryStatusController');
const router = express.Router();

const {updateDeliveryStatus} = getData;

router.post('/updateDeliveryStatus',updateDeliveryStatus);

module.exports = {
    routes: router
}