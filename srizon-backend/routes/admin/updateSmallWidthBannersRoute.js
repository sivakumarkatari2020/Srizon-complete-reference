'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updateSmallWidthBannersController');
const router = express.Router();

const {updateSmallWidthBanners} = getData;

router.post('/updateSmallWidthBanners',updateSmallWidthBanners);

module.exports = {
    routes: router
}