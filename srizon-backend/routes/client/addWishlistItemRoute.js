'use strict';

const express = require('express');
const getData = require('../../controllers/client/addWishlistItemController');
const router = express.Router();

const {addWishlistItem} = getData;

router.post('/addToWishlist',addWishlistItem);

module.exports = {
    routes : router
}