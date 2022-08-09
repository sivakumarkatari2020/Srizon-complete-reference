'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveReviewController');
const router = express.Router();

const {saveReview} = getData;

router.post('/review/new',saveReview)

module.exports = {
    routes: router
}