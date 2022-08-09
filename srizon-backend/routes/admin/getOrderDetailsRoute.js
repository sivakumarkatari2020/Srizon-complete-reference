'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getOrderDetailsController');
const router = express.Router();

const {getOrderDetails} = getData;

router.get('/getOrderDetails/:id',getOrderDetails);

module.exports = {
    routes: router
}