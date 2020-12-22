const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const ImageExercisesCategorySchema = new mongoose.Schema({
  name: String,
  image: String,
});

ImageExercisesCategorySchema.plugin(
  autoIncreament.plugin,
  "ImageExercisesCategory"
);

module.exports = mongoose.model(
  "ImageExercisesCategory",
  ImageExercisesCategorySchema,
  "imageExercisesCategories"
);
