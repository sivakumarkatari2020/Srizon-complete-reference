'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getUserlistController');
const router = express.Router();

const {getUserlist} = getData;

router.get('/getUserlist',getUserlist);

module.exports = {
    routes: router
}