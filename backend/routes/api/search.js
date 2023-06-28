const express = require('express');
const { User, Spot, Sequelize, sequelize } = require('../../db/models');
const router = express.Router();
const { Op } = require('sequelize');


router.post('/', async (req, res) => {
    const { query } = req.body;
    try {
        const results = await Spot.findAll({
            where: {
                description: { [Op.like]: "%" + query.toLowerCase() + "%" }
            },
        });
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ message: 'No results found.' });
        }
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: 'An error occurred while performing the search' });
    }
});

module.exports = router;
