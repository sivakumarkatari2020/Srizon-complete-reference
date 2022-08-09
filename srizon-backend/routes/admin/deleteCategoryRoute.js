'use strict';

const express = require('express');
const getData = require('../../controllers/admin/deleteCategoryController');
const router = express.Router();

const {deleteCategory} = getData;

router.get('/deleteCategory/:id',deleteCategory);

module.exports = {
    routes: router
}