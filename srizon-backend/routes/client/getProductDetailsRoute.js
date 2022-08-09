'use strict';

const express = require('express');
const getData = require('../../controllers/client/getProductDetailsController');
const router = express.Router();

const {getProductDetails} = getData;

router.get('/getProductDetails/:product_id',getProductDetails);

module.exports = {
    routes: router
}