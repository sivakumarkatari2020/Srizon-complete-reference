'use strict';

const express = require('express');
const getData = require('../../controllers/client/getProductReviewsController');
const router = express.Router();

const {getProductReviews} = getData;

router.get('/getProductReviews/:product_id',getProductReviews);

module.exports = {
    routes: router
}