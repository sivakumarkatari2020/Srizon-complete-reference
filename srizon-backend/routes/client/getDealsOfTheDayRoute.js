'use strict';

const express = require('express');
const getData = require('../../controllers/client/getDealsOfTheDayController');
const router = express.Router();

const {getDealsOfTheDay} = getData;

router.get('/getDealsOfTheDay',getDealsOfTheDay);

module.exports = {
    routes: router
}