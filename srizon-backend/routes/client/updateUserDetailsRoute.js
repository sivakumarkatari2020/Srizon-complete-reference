'use strict';

const express = require('express');
const getData = require('../../controllers/client/updateUserDetailsController');
const router = express.Router();

const {updateUserDetails} = getData;

router.post('/updateUser',updateUserDetails)

module.exports = {
    routes: router
}