'use strict';

const express = require('express');
const getData = require('../../controllers/client/getLatest10ProductsController');
const router = express.Router();

const {getLatest10Products} = getData;

router.get('/getLatest10Products',getLatest10Products);

module.exports = {
    routes: router
}