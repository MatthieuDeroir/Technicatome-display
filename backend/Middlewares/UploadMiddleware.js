const fileupload = require("express-fileupload");
const fs = require("fs");

const uploadMiddleware = (app) => {
    app.use(fileupload());
    app.use(express.static("medias"));

    app.post("/upload", (req, res) => {
        // Votre logique d'upload
    });

    app.post("/delete", (req, res) => {
        // Votre logique de suppression
    });
};

export default uploadMiddleware;
