const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  benefits: [{ type: String }],
  process: [{ type: String }],
  price: { type: String, required: true },
  duration: { type: String, required: true },
  coverage: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
