const path = require("path");
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const imageRouter = require("./routes/imageRoutes");
require("dotenv").config();
require("./helper/init_mongodb");
const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("./client/public"));
app.use(express.json());
app.use(express.text({ type: "text/html" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", imageRouter);

app.get("/home",(req,res)=>{
  res.send("Welcome to HackerEarth!")
})

app.use((req, res, next) => {
  // const error = new Error("Not Found");
  // error.status = 404;
  // next(error);
  next(createError.NotFound("This route doesnot exist"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    error: err.message,
  });
});

module.exports = app;
