'use strict';

const express = require('express');
const getData = require('../../controllers/admin/verifyAdminController');
const router = express.Router();

const {verifyAdmin} = getData;

router.post('/login/verify',verifyAdmin)

module.exports = {
    routes: router
}