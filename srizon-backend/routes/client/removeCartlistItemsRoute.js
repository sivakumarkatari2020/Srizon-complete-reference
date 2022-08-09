'use strict';

const express = require('express');
const getData = require('../../controllers/client/removeCartlistItemsController');
const router = express.Router();

const {removeCartlistItems} = getData;

router.get('/removeCartlistItems/:user_id',removeCartlistItems);

module.exports = {
    routes: router
}