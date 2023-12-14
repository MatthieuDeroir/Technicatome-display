const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    temperature: {
        type: String,
        required: true
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
