const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  mainImage: String,
});

ArticleSchema.plugin(autoIncreament.plugin, "Article");

module.exports = mongoose.model("Article", ArticleSchema, "articles");
