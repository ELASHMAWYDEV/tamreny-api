const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const VideoExerciseSchema = new mongoose.Schema({
  categoryId: { type: Number, ref: "VideoExercisesCategory", required: true },
  title: String,
  description: String,
  videoId: String,
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

VideoExerciseSchema.plugin(autoIncreament.plugin, {
  model: "VideoExercise",
  startAt: 1,
});

module.exports = mongoose.model(
  "VideoExercise",
  VideoExerciseSchema,
  "videoExercises"
);
