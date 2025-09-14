let mongoose = require("mongoose");

let bookingSchema = new mongoose.Schema({
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

  // 👇 new field for user's local timezone
  timeZone: {
    type: String,
    required: true, // e.g., "America/New_York" or "Asia/Karachi"
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
  },
  estimatedPrice: {
    type: Number,
    default: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  unitCount: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Booking", bookingSchema);
