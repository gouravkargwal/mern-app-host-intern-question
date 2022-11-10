const express = require("express");
const router = express.Router();
const {
  addImage,
  getAllImage,
  getImage,
  deleteImage,
  updateImage,
} = require("../controller/imageController");

router.get("/", getAllImage);
router.post("/", addImage);
router.get("/:id", getImage);
router.put("/:id/edit", updateImage);
router.delete("/delete/:id", deleteImage);

module.exports = router;
