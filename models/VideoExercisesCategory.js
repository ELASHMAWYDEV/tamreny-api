const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const VideoExercisesCategorySchema = new mongoose.Schema({
  name: String,
  image: String,
});

VideoExercisesCategorySchema.plugin(
  autoIncreament.plugin,
  "VideoExercisesCategory"
);

module.exports = mongoose.model(
  "VideoExercisesCategory",
  VideoExercisesCategorySchema,
  "videoExercisesCategories"
);
