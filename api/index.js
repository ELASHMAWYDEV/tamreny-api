const express = require("express");
const router = express.Router();

//Routes
router.use("/users", require("./users/index"));
router.use("/articles", require("./articles/index"));
router.use("/categories", require("./categories/index"));
router.use("/imageExersices", require("./imageExercises/index"));
// router.use("/halls", require("./halls/index"));
// router.use("/videoExersices", require("./videoExersices/index"));
// router.use("/proteins", require("./proteins/index"));

module.exports = router;
