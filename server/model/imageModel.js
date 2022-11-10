const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imgName: { type: String, required: true },
  imgURL: { type: String, required: true },
  imgDetails: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
