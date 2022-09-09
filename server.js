global.__basedir = __dirname;
require("dotenv").config({ path: "configs/.env" });
require("colors");

const express = require("express");

const hashcode = require("./routes/hashcode.routes");
const connectDB = require("./configs/db");
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(hashcode);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on ${PORT} port...`.bgCyan.black
  );
  connectDB();
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Err: ${err.message}`.bgRed);
  server.close(() => process.exit(1));
});
