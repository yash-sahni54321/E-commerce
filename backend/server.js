const app = require("./app");
const dotenv = require("dotenv");
const database = require("./config/database");
const cloudinary = require("cloudinary");

//Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught Exception");
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });
// connecting to Database.
database();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log("connect to the PORT");
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
