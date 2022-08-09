'use strict';

const express = require('express');
const getData = require('../../controllers/client/getWrappBannersController');
const router = express.Router();

const {getWrappBanners} = getData;

router.get('/getWrappBanners',getWrappBanners);

module.exports = {
    routes: router
}