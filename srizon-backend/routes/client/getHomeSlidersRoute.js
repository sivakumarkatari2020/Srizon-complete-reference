'use strict';

const express = require('express');
const getData = require('../../controllers/client/getHomeSlidersController');
const router = express.Router();

const {getHomeSliders} = getData;

router.get('/getHomeSliders',getHomeSliders);

module.exports = {
    routes: router
}