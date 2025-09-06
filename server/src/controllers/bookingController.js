// controllers/bookingController.js

const Booking = require("../models/Booking");
const { sendEmail } = require("../services/emailService");

const bookingController = {
  // ✅ Create Booking
  createBooking: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        contactNumber,
        homeAddress,
        city,
        state,
        zip,
        furnaceOrUnit,
        serviceType,
        cleaningDate,
        cleaningTime,
        comment,
        estimatedPrice,
        originalPrice,
        discountAmount,
        unitCount
      } = req.body;

      if (!firstName || !lastName || !email || !contactNumber || !homeAddress || !city || !state || !zip || !furnaceOrUnit || !serviceType || !cleaningDate || !cleaningTime) {
        return res.status(400).json({ message: "Please provide all required fields." });
      }

      // Save booking
      const newBooking = new Booking({
        firstName,
        lastName,
        email,
        contactNumber,
        homeAddress,
        city,
        state,
        zip,
        furnaceOrUnit,
        serviceType,
        cleaningDate,
        cleaningTime,
        comment,
        estimatedPrice: estimatedPrice || 0,
        originalPrice: originalPrice || 0,
        discountAmount: discountAmount || 0,
        unitCount: unitCount || 1
      });

      const savedBooking = await newBooking.save();

      // ✅ Email to Admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: "New Booking Request - TrueAir Duct Solution",
        text: `New booking received from ${firstName} ${lastName}, Service: ${serviceType}, Date: ${cleaningDate}, Time: ${cleaningTime}`,
        html: `<h2>New Booking Request</h2>
           <p><strong>Name:</strong> ${firstName} ${lastName}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Contact:</strong> ${contactNumber}</p>
           <p><strong>Service:</strong> ${serviceType}</p>
           <p><strong>Date:</strong> ${cleaningDate} at ${cleaningTime}</p>
           <p><strong>Address:</strong> ${homeAddress}, ${city}, ${state} - ${zip}</p>
           <p><strong>Message:</strong> ${comment || "N/A"}</p>`
      });


      res.status(201).json({
        message: "Booking created successfully.",
        data: savedBooking,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to create booking.",
        error: error.message,
      });
    }
  },

  // ✅ Update Booking Status (Admin)
  updateBookingStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found." });
      }

      // ✅ If confirmed, send email to customer
      if (status === "confirmed") {
        await sendEmail({
          to: updatedBooking.email,
          subject: "Your Booking is Confirmed - TrueAir Duct Solution",
          text: `Hello ${updatedBooking.firstName}, your booking for ${updatedBooking.serviceType} on ${updatedBooking.cleaningDate} at ${updatedBooking.cleaningTime} has been confirmed.`,
          html: `<h2>Booking Confirmed ✅</h2>
         <p>Hello <strong>${updatedBooking.firstName}</strong>,</p>
         <p>Your booking for <strong>${updatedBooking.serviceType}</strong> on <strong>${updatedBooking.cleaningDate}</strong> at <strong>${updatedBooking.cleaningTime}</strong> has been confirmed.</p>
         <p>Thank you for choosing <strong>TrueAir Duct Solution</strong>! We look forward to serving you.</p>`
        });

      }

      res.status(200).json({
        message: "Booking updated successfully.",
        data: updatedBooking,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update booking.",
        error: error.message,
      });
    }
  },

  // ✅ Get All Bookings (Admin)
  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings.", error: error.message });
    }
  },

  // ✅ Get Booking By ID
  getBookingById: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) return res.status(404).json({ message: "Booking not found." });

      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking.", error: error.message });
    }
  },

  // ✅ Delete Booking
  deleteBooking: async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
      if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found." });
      }

      res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete booking.", error: error.message });
    }
  },
};

module.exports = bookingController;
