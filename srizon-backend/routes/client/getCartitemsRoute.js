'use strict';

const express = require('express');
const getData = require('../../controllers/client/getCartitemsController');
const router = express.Router();

const {getCartitems} = getData;

router.get('/getCartitems/:user_id',getCartitems);

module.exports = {
    routes: router
}