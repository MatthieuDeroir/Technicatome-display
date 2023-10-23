const mongoose = require('mongoose');


const MediaSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name:{
        type: String,
    },
    mediaName:{
        type: String,
    },
    user:{
        type: String,
    },
    format:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now()
    },
    path:{
        type: String,
    },
    duration:{
        type: Number
    },
    order:{
        type: Number
    },
    data:{

    }
})


const Medias = mongoose.model('Medias', MediaSchema);

module.exports = Medias;
