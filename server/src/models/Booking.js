const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  furnaceOrUnit: {
    type: String,
    required: true, // e.g., Furnace / AC Unit etc.
  },
  serviceType: {
    type: String,
    required: true, // select dropdown se ayega
  },
  cleaningDate: {
    type: Date,
    required: true, // jis din cleaning karwani hai
  },
  cleaningTime: {
    type: String,
    required: true, // jis waqt cleaning karwani hai
  },
  bookingDate: {
    type: Date,
    default: Date.now, // jab order place hoga us waqt ki date/time
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  comment: {
    type: String, // agar customer note dena chahe
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Booking", bookingSchema);
