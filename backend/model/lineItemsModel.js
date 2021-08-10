const mongoose = require("mongoose");

const LineItemsSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
  },
  line_items: [{ price: Number, title: String }],
});

const LineItems = mongoose.model("LineItems", LineItemsSchema);

module.exports = LineItems;
