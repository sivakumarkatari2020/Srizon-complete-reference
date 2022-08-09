'use strict';

const express = require('express');
const getData = require('../../controllers/admin/deleteProductController');
const router = express.Router();

const {deleteProduct} = getData;

router.get('/deleteProduct/:id',deleteProduct);

module.exports = {
    routes: router
}