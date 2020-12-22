const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  phoneNumber: Number,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.plugin(autoIncreament.plugin, "User");

module.exports = mongoose.model("User", UserSchema, "users");
