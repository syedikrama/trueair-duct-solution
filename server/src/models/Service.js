// let mongoose = require("mongoose");

// let serviceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   image: { type: String, required: true },
//   description: { type: String, required: true },
//   benefits: [{ type: String }],
//   process: [{ type: String }],
//   price: { type: String, required: true },
//   duration: { type: String, required: true },
//   coverage: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model("Service", serviceSchema);







let mongoose = require("mongoose");

let serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  benefits: [{ type: String }],
  process: [{ type: String }],
  price: { type: String, required: true },
  duration: { type: String, required: true },
  coverage: { type: String, required: true },
  // ✅ Naya packages field add karo
  packages: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: [{ type: String, required: true }],
    isPopular: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);