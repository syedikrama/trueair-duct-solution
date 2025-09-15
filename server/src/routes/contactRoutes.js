const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Contact form routes
router.post("/", contactController.createContact);
router.get("/", contactController.getAllContacts);
router.get("/:id", contactController.getContactById);
router.put("/:id", contactController.updateContactStatus);
router.delete("/:id", contactController.deleteContact);

module.exports = router;