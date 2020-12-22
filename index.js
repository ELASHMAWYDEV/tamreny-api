const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const ArticleModel = require("./models/Article");
//init
require("./db");

//Middlewares
app.use(cors());
app.use(express.json());

//Api
app.use("/api", require("./api/index"));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
