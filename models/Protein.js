const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const ProteinSchema = new mongoose.Schema({
  name: String,
  description: String,
  mainImage: String,
});

ProteinSchema.plugin(autoIncreament.plugin, "Protein");

module.exports = mongoose.model("Protein", ProteinSchema, "proteins");