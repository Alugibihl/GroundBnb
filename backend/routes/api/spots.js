const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


// to make a route, add the files above and at the bottom
// add to index at the top and as middleware
router.get('/', async (req, res) => {


})












module.exports = router;
