const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

const URL = mongoose.model('Url', urlSchema);

module.exports = URL;
