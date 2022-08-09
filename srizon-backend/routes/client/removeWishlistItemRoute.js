'use strict';

const express = require('express');
const getData = require('../../controllers/client/removeWishlistItemController');
const router = express.Router();

const {removeWishlistItem} = getData;

router.get('/removeWishlistItem/:user_id/:wishlist_id',removeWishlistItem);

module.exports = {
    routes: router
}