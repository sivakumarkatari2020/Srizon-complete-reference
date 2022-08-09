'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getProductlistController');
const router = express.Router();

const {getProductlist} = getData;

router.get('/getProductlist',getProductlist);

module.exports = {
    routes: router
}