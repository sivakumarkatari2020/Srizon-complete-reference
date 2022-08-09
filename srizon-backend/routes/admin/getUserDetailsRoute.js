'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getUserDetailsController');
const router = express.Router();

const {getUserDetails} = getData;

router.get('/getUserDetails/:user_id',getUserDetails);

module.exports = {
    routes: router
}