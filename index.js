const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const db = require("./db");

//init

//Middlewares
app.use(cors());
app.use(express.json());

//Api
app.use("/api", require("./api/index"));


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));