const createError = require("http-errors");
const Image = require("../model/imageModel");

exports.addImage = async (req, res) => {
  try {
    if (!req.body) {
      throw createError.UnprocessableEntity("Not data found!");
    }
    const imageData = await Image.create(req.body);
    if (!imageData) {
      throw createError.InternalServerError();
    }
    res.status(200).json({
      message: "File upload successful!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

exports.getAllImage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || "0";
    const query = req.query.name;
    const PAGE_SIZE = 9;
    if (!query) {
      const getImage = await Image.find({})
        .select("imgName imgURL")
        .skip(PAGE_SIZE * page)
        .limit(PAGE_SIZE);
      const total = (await Image.countDocuments()) - 1;
      if (!getImage) throw createError.NotFound();
      return res.status(200).json({
        message: "Data fetched successfully!",
        body: {
          getImage,
          total: Math.ceil((total + 1) / PAGE_SIZE),
        },
      });
    }
    const getImageQueried = await Image.find({
      imgName: { $regex: query, $options: "i" },
    })
      .select("imgName imgURL")
      .skip(PAGE_SIZE * page)
      .limit(PAGE_SIZE);
    const total = getImageQueried.length;
    if (!getImageQueried) throw createError.NotFound();
    return res.status(200).json({
      message: "Data fetched successfully!",
      body: {
        getImage: getImageQueried,
        total: Math.ceil((total + 1) / PAGE_SIZE),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById({ _id: id });
    if (!image) throw createError.NotFound();
    res.status(200).json({
      message: "Image fetched successfully!",
      body: image,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      error: "Something went wrong",
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Image.findByIdAndDelete({ _id: id });
    if ((deletedImage.deletedCount = 0)) {
      throw createError.NotImplemented("Image not deleted");
    }
    res.status(200).json({
      message: "Image deleted successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByIdAndUpdate({ _id: id }, req.body);
    if (!image) throw createError.NotImplemented("Image not updated!");
    res.status(200).json({
      message: "Image updated successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};
