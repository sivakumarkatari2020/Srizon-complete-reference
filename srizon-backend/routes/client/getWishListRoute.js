'use strict';

const express = require('express');
const getData = require('../../controllers/client/getWishListController');
const router = express.Router();

const {getWishList} = getData;

router.get('/getWishList/:user_id',getWishList);

module.exports = {
    routes: router
}