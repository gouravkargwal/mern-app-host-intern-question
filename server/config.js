const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: "development",
  HOST: "localhost",
  PORT: 5000,
  DATABASE: "mongodb://localhost:27017/figurine",
};
