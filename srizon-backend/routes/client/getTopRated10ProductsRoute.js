'use strict';

const express = require('express');
const getData = require('../../controllers/client/getTopRated10ProductsController');
const router = express.Router();

const {getTopRated10Products} = getData;

router.get('/getTopRated10Products',getTopRated10Products);

module.exports = {
    routes: router
}