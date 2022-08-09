'use strict';

const express = require('express');
const getData = require('../../controllers/client/verifyUserController');
const router = express.Router();

const {verifyUser} = getData;

router.post('/login/verify',verifyUser)

module.exports = {
    routes: router
}