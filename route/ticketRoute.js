const express = require('express');
const TicketCounter = require('../models/ticketCounter');
const router = express.Router();

// Reset ticket counter to 1
router.put('/reset', async (req, res) => {
    try {
        let ticketCounter = await TicketCounter.findOne();
        if (!ticketCounter) {
            ticketCounter = new TicketCounter();
        }
        ticketCounter.counter = 1;
        await ticketCounter.save();
        res.json({ message: 'Ticket counter reset successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
