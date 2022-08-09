'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getOrderlistController');
const router = express.Router();

const {getOrderlist} = getData;

router.get('/getOrderlist',getOrderlist);

module.exports = {
    routes: router
}