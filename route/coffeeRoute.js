const express = require('express');
const Coffee = require('../models/coffee');
const router = express.Router();

// Get all coffees
router.get('/', async (req, res) => {
    try {
        const coffees = await Coffee.find();
        res.json(coffees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;