'use strict';

const express = require('express');
const getData = require('../../controllers/client/removeWishlistItemsController');
const router = express.Router();

const {removeWishlistItems} = getData;

router.get('/removeWishlistItems/:user_id',removeWishlistItems);

module.exports = {
    routes: router
}