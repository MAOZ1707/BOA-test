const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
  },
  fullName: {
    type: String,
  },
  orderDate: {
    type: String,
  },
  summaryAmount: {
    type: String,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
