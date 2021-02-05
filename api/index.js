const express = require("express");
const router = express.Router();

//Routes
router.use("/users", require("./users/index"));
router.use("/articles", require("./articles/index"));
router.use("/categories", require("./categories/index"));
router.use("/exercises", require("./exercises/index"));
router.use("/halls", require("./halls/index"));
router.use("/proteins", require("./proteins/index"));
router.use("/products", require("./products/index"));
router.use("/paymentMethods", require("./paymentMethods/index"));

module.exports = router;
