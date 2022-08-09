'use strict';

const express = require('express');
const getData = require('../../controllers/client/restoreQuantityController');
const router = express.Router();

const {restoreQuantity} = getData;

router.post('/restore/quantity',restoreQuantity)

module.exports = {
    routes: router
}