'use strict';

const express = require('express');
const getData = require('../../controllers/client/getCategoryProductsController');
const router = express.Router();

const {getCategoryProducts} = getData;

router.get('/getCategoryProducts/:category_id',getCategoryProducts);

module.exports = {
    routes: router
}