const Contact = require("../models/Contact");
const { sendEmail } = require("../services/emailService");

const contactController = {
  // ✅ Create Contact Form Submission
  createContact: async (req, res) => {
    try {
      const { name, email, phone, service, message } = req.body;

      if (!name || !email || !phone || !service || !message) {
        return res.status(400).json({ 
          message: "Please provide all required fields." 
        });
      }

      // Save contact form data
      const newContact = new Contact({
        name,
        email,
        phone,
        service,
        message
      });

      const savedContact = await newContact.save();

      // ✅ Email to Admin
      await sendEmail({
        to: process.env.ADMIN_EMAIL || "trueair881@gmail.com",
        subject: "New Contact Form Submission - TrueAir Duct Solution",
        text: `New contact form received from ${name} (${email}), Service: ${service}`,
        html: `<h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Interested:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>`
      });

      // ✅ Auto-reply to customer
      await sendEmail({
        to: email,
        subject: "Thank You for Contacting TrueAir Duct Solution",
        text: `Hello ${name}, thank you for contacting us. We have received your message and will get back to you within 24 hours.`,
        html: `<h2>Thank You for Contacting Us!</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for reaching out to TrueAir Duct Solution. We have received your message and our team will contact you within 24 hours.</p>
          <p><strong>Your Message:</strong> ${message}</p>
          <p>If you have any urgent inquiries, please call us at: <strong>(463) 227-5480</strong></p>
          <p>Best regards,<br>TrueAir Duct Solution Team</p>`
      });

      res.status(201).json({
        message: "Thank you for your message. We will contact you soon!",
        data: savedContact,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to submit contact form.",
        error: error.message,
      });
    }
  },

  // ✅ Get All Contact Submissions (Admin)
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch contact submissions.", 
        error: error.message 
      });
    }
  },

  // ✅ Get Contact By ID
  getContactById: async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact submission not found." });
      }

      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch contact submission.", 
        error: error.message 
      });
    }
  },

  // ✅ Update Contact Status
  updateContactStatus: async (req, res) => {
    try {
      const { status } = req.body;

      const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ message: "Contact submission not found." });
      }

      res.status(200).json({
        message: "Contact status updated successfully.",
        data: updatedContact,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update contact status.",
        error: error.message,
      });
    }
  },

  // ✅ Delete Contact Submission
  deleteContact: async (req, res) => {
    try {
      const deletedContact = await Contact.findByIdAndDelete(req.params.id);
      if (!deletedContact) {
        return res.status(404).json({ message: "Contact submission not found." });
      }

      res.status(200).json({ message: "Contact submission deleted successfully." });
    } catch (error) {
      res.status(500).json({
        message: "Failed to delete contact submission.",
        error: error.message,
      });
    }
  }
};

module.exports = contactController;