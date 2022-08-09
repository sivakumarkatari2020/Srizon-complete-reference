'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updateFullWidthBannersController');
const router = express.Router();

const {updateFullWidthBanners} = getData;

router.post('/updateFullWidthBanners',updateFullWidthBanners);

module.exports = {
    routes: router
}