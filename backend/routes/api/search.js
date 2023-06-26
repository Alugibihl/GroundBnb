const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking, Spot, SpotImage, Review, ReviewImage, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { json, DATE } = require('sequelize');
const { Op } = require('sequelize');


router.post('/', async (req, res) => {
    console.log("req.body");
    const { query } = req.body;
    console.log("--------------------------", query);
    try {
        const results = await Spot.findAll({
            where: {
                name: { [Op.like]: `%${query.toLowerCase()}%` },
                description: { [Op.like]: `%${query.toLowerCase()}%` },
            },
        });

        if (results.length > 0) {
            console.log("--------------results", results);
            res.json(results);
        } else {
            console.log("--------------results bad", results);
            res.json({ message: 'No results found.' });
        }
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: 'An error occurred while performing the search' });
    }
});

module.exports = router;
