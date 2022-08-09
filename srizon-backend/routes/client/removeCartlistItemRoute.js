'use strict';

const express = require('express');
const getData = require('../../controllers/client/removeCartlistItemController');
const router = express.Router();

const {removeCartlistItem} = getData;

router.get('/removeCartlistItem/:user_id/:cartitem_id',removeCartlistItem);

module.exports = {
    routes: router
}