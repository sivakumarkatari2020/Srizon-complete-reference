'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updateProductDetailsController');
const router = express.Router();

const {updateProductDetails} = getData;

router.post('/updateProductDetails',updateProductDetails);

module.exports = {
    routes: router
}