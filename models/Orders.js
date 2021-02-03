const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const OrderSchema = new mongoose.Schema({
  productId: {
    type: Number,
    ref: "Product",
    required: true,
  },
  paymentMethodId: {
    type: Number,
    ref: "PaymentMethod",
    required: true,
  },
  total: Number,
  status: Number,
  paymentImage: String,
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

OrderSchema.plugin(autoIncreament.plugin, { model: "Order", startAt: 1 });

module.exports = mongoose.model("Order", OrderSchema, "orders");
