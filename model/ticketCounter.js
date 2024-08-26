const mongoose = require('mongoose');

const ticketCounterSchema = new mongoose.Schema({
    counter: { type: Number, default: 1 }
});

module.exports = mongoose.model('TicketCounter', ticketCounterSchema);