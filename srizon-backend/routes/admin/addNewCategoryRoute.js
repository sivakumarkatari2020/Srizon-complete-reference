'use strict';

const express = require('express');
const getData = require('../../controllers/admin/addNewCategoryController');
const router = express.Router();

const {addNewCategory} = getData;

router.post('/addNewCategory',addNewCategory);

module.exports = {
    routes: router
}