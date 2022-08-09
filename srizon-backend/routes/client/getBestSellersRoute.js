'use strict';

const express = require('express');
const getData = require('../../controllers/client/getBestSellersController');
const router = express.Router();

const {getBestSellers} = getData;

router.get('/getBestSellers',getBestSellers);

module.exports = {
    routes: router
}
