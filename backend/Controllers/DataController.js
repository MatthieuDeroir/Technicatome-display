// data controller
const DataModel = require("../Models/DataModel");


exports.initializeData = async (req, res) => {
    try {
        const data = await DataModel.findOne();
        if (!data) {
            const defaultData = new DataModel({
                temperature: "25",
            });
            await defaultData.save();
            console.log("Datas document initialized successfully");
        } else {
            console.log("Datas document already exists");
        }
    } catch (error) {
        console.error("Error initializing Datas document:", error);
    }
};

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
        // Use findOneAndUpdate to get and update the first document
        const updatedData = await DataModel.findOneAndUpdate({}, req.body, {
            new: true,
            runValidators: true,
            sort: {_id: 1} // sorts documents by _id in ascending order, effectively getting the first document
        });
        if (!updatedData) {
            return res.status(404).json({
                status: "fail",
                message: "No data found",
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

exports.updateFirstData = async (req, res) => {
    try {
        // Step 1: Fetch all documents
        const allData = await DataModel.find();

        // Step 2: Select only the first document
        const firstData = allData[0];

        if (!firstData) {
            return res.status(404).json({
                status: "fail",
                message: "No data found"
            });
        }

        // Step 3: Update the first document with req.body
        Object.assign(firstData, req.body);

        // Step 4: Save the updated document
        const updatedData = await firstData.save();

        // Send response
        res.status(200).json({
            status: "success",
            data: updatedData
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};


