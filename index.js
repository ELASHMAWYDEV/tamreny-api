const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { checkToken } = require("./helpers/jwt");
const PORT = process.env.PORT || 5000;

//init
require("./db");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

//Api
app.use("/api", checkToken, require("./api/index"));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
