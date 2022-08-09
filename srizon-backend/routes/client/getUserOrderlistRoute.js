'use strict';

const express = require('express');
const getData = require('../../controllers/client/getUserOrderlistController');
const router = express.Router();

const {getUserOrderlist} = getData;

router.get('/getUserOrderlist/:user_id',getUserOrderlist);

module.exports = {
    routes: router
}