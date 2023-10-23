const Slideshow = require('../Models/SlideshowModel');

// Obtenir tous les slideshows
exports.getAllSlideshows = async (req, res) => {
    try {
        const slideshows = await Slideshow.find();
        res.status(200).json({
            status: 'success',
            data: {
                slideshows
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Créer un nouveau slideshow
exports.createSlideshow = async (req, res) => {
    console.log("createSlideshow",req.body);
    try {
        const newSlideshow = await Slideshow.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                slideshow: newSlideshow
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Obtenir un slideshow par ID
exports.getSlideshow = async (req, res) => {
    try {
        const slideshow = await Slideshow.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                slideshow
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Mettre à jour un slideshow
exports.updateSlideshow = async (req, res) => {
    try {
        const slideshow = await Slideshow.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                slideshow
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

// Supprimer un slideshow
exports.deleteSlideshow = async (req, res) => {
    console.log("deleteSlideshow",req.params.id);
    try {
        await Slideshow.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


