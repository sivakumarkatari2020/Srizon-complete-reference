'use strict';

const express = require('express');
const getData = require('../../controllers/admin/addNewProductController');
const router = express.Router();

const {addNewProduct} = getData;

router.post('/addNewProduct',addNewProduct);

module.exports = {
    routes: router
}