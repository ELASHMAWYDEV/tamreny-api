const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const ImageExerciseSchema = new mongoose.Schema({
  categoryId: { type: Number, ref: "ImageExercisesCategory", required: true },
  title: String,
  description: String,
  images: [String],
});

ImageExerciseSchema.plugin(autoIncreament.plugin, "ImageExercise");

module.exports = mongoose.model(
  "ImageExercise",
  ImageExerciseSchema,
  "imageExercises"
);
