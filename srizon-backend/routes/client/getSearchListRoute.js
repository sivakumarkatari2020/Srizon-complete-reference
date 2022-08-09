'use strict';

const express = require('express');
const getData = require('../../controllers/client/getSearchListController');
const router = express.Router();

const {getSearchList} = getData;

router.get('/getSearchList/:key',getSearchList);

module.exports = {
    routes: router
}