const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const Media = require("../Models/MediaModel");
const Slideshow = require("../Models/SlideshowModel");

exports.uploadFile = async (req, res) => {
  const slideshowId = req.body.slideshowId;
  const originalFilename = req.file.originalname;
  const hashedFilename = crypto
    .createHash("sha256")
    .update(originalFilename)
    .digest("hex");
  const format = req.file.mimetype.split("/")[1];
  const duration = 10;
  const order = 1;
  const newpath = path.join(__dirname, "../../frontend/public/media/");
  const oldPath = req.file.path;

  const newPathWithFileName = path.join(newpath, `${hashedFilename}.${format}`);

  fs.rename(oldPath, newPathWithFileName, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "File upload failed", code: 500 });
    }

    const media = new Media({
      originalFilename: originalFilename,
      hashedFilename: hashedFilename,
      user: req.body.user,
      format: format,
      path: `/media/${hashedFilename}.${format}`,
      duration: duration,
      order: order,
    });

    try {
      await Slideshow.findByIdAndUpdate(
        slideshowId,
        { $push: { media: media } },
        { new: true, useFindAndModify: false }
      );

      res.status(200).json(media);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Erreur lors de l'ajout du média au slideshow",
        code: 500,
      });
    }
  });
};

exports.deleteFile = (req, res) => {
  const directoryPath = path.join(
    __dirname,
    "../../panneau_couchet/public/media/"
  );
  const fileName = req.body.fileName;
  const format = req.body.format;

  if (req.body.fileName != "file") {
    fs.unlink(`${directoryPath}${fileName}.${format}`, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "File deletion failed", code: 500 });
      } else {
        res.status(200).send({ message: "File deleted", code: 200 });
      }
    });
  }
};
