let express = require("express");
let router = express.Router();
let bookingController = require("../controllers/bookingController");

// ✅ Create a new booking
router.post("/", bookingController.createBooking);

// ✅ Get all bookings
router.get("/", bookingController.getAllBookings);

// ✅ Get booking by ID
router.get("/:id", bookingController.getBookingById);

// ✅ Update booking status (Admin confirm/cancel etc.)
router.put("/:id/status", bookingController.updateBookingStatus);

// ✅ Delete a booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
