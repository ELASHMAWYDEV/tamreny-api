const express = require("express");
const router = express.Router();

//Routes
router.use("/users", require("./users/index"));
router.use("/articles", require("./articles/index"));
// router.use("/halls", require("./halls/index"));
// router.use("/imageExersices", require("./imageExersices/index"));
// router.use("/videoExersices", require("./videoExersices/index"));
// router.use("/proteins", require("./proteins/index"));

module.exports = router;
