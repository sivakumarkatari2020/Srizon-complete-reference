'use strict';

const express = require('express');
const getData = require('../../controllers/client/getCategoryListController');
const router = express.Router();

const {getCategoryList} = getData;

router.get('/getCategoryList',getCategoryList);

module.exports = {
    routes: router
}