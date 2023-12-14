// data controller
const DataModel = require("../Models/DataModel");

exports.getData = async (req, res) => {
    try {
        const data = await DataModel.find();
        res.status(200).json({
            status: "success",
            data,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
}

exports.createData = async (req, res) => {
    try {
        const newData = await DataModel.create(req.body);
        res.status(201).json({
            status: "success",
            data: newData,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
}

// update data
exports.updateData = async (req, res) => {
    try {
        const updatedData = await DataModel.findByIdAndUpdate(req.param.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedData) {
            return res.status(404).json({
                status: "fail",
                message: "No data found with that ID",
            });

        }
        res.status(200).json({
            status: "success",
            data: updatedData,
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
    
}
