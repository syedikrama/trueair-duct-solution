let express = require("express");
let router = express.Router();
let serviceController = require("../controllers/serviceController");

// Routes
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getServiceById);
router.post("/", serviceController.createService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;
