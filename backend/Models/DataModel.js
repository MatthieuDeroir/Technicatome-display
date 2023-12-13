const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    temperature: {
        type: String,
        required: true
    }
});
