const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const SubscriptionSchema = new mongoose.Schema({
  name: String,
  price: String,
});

const PointSchema = new mongoose.Schema({
  type: {
    type: "Point",
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const HallSchema = new mongoose.Schema({
  name: String,
  city: String,
  images: [String],
  videoUrl: String,
  brief: String,
  subscribtions: [SubscriptionSchema],
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
});

HallSchema.plugin(autoIncreament.plugin, "Hall");

module.exports = mongoose.model("Hall", HallSchema, "halls");
