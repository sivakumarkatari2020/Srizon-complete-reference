'use strict';

const express = require('express');
const getData = require('../../controllers/client/addCartitemController');
const router = express.Router();

const {addCartitem} = getData;

router.post('/addToCart',addCartitem);

module.exports = {
    routes : router
}