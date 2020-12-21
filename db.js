require("dotenv/config");
const mongoose = require("mongoose");
const MONGO_URI_DEVELOPMENT = process.env.MONGO_URI_DEVELOPMENT;
const MONGO_URI_PRODUCTION = process.env.MONGO_URI_PRODUCTION;

//Connect to mongodb
const URI =
  process.env.NODE_ENV == "development"
    ? MONGO_URI_DEVELOPMENT
    : process.env.NODE_ENV == "production" && MONGO_URI_PRODUCTION;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//Handle connection and database errors
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(`MongoDB Error: ${err.message}`);
});

db.once("open", () => console.log("connected to DB"));
db.once("close", () => console.l("Connection to DB closed..."));
