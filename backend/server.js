const app = require("./app");
const dotenv = require("dotenv");
const database = require("./config/database");

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
