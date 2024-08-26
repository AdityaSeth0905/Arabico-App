const express = require('express');
const Order = require('../models/order');
const TicketCounter = require('../models/ticketCounter');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    const items = req.body.items;

    // Get the current ticket number
    let ticketCounter = await TicketCounter.findOne();
    if (!ticketCounter) {
        ticketCounter = new TicketCounter();
    }

    const order = new Order({
        ticketNumber: ticketCounter.counter,
        items: items
    });

    try {
        const newOrder = await order.save();
        ticketCounter.counter += 1;
        await ticketCounter.save();

        res.status(201).json({ ticketNumber: newOrder.ticketNumber });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get an order by ticket number
router.get('/:ticketNo', async (req, res) => {
    try {
        const order = await Order.findOne({ ticketNumber: req.params.ticketNo }).populate('items.coffee');
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
