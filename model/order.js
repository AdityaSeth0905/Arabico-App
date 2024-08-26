const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    ticketNumber: { type: Number, required: true },
    items: [{
        coffee: { type: mongoose.Schema.Types.ObjectId, ref: 'Coffee' },
        quantity: { type: Number, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
