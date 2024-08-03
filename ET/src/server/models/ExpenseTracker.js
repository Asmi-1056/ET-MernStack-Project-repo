const mongoose = require('mongoose');

const ExpenseTrackerSchema = new mongoose.Schema({
    amount: {
        type: Number,
        default:0
    },
    event: {
        type: String,
        default:'unknown'
    },
    transType: {
        type: String,
        default: 'unknown'
    },
    expense: {
        type: Number,
        default:0
    },
    income: {
        type: Number,
        default:0
    },
    balance: {
        type: Number,
        default:0
    },
});

module.exports = mongoose.model('ExpenseTracker', ExpenseTrackerSchema);