'use strict';

const express = require('express');
const getData = require('../../controllers/client/registerUserController');
const router = express.Router();

const {registerUser} = getData;

router.post('/register/new',registerUser)

module.exports = {
    routes: router
}