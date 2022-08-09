'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updateTrackingStatusController');
const router = express.Router();

const {updateTrackingStatus} = getData;

router.post('/updateTrackingStatus',updateTrackingStatus);

module.exports = {
    routes: router
}