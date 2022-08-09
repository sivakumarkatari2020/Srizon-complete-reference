'use strict';

const express = require('express');
const getData = require('../../controllers/admin/deleteUserController');
const router = express.Router();

const {deleteUser} = getData;

router.get('/deleteUser/:id',deleteUser);

module.exports = {
    routes: router
}