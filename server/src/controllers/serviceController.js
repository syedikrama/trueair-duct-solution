let Service = require("../models/Service");

// ✅ Get all services
exports.getAllServices = async (req, res) => {
  try {
    let services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

// ✅ Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch service",
      error: error.message,
    });
  }
};

// ✅ Create new service (Admin)
exports.createService = async (req, res) => {
  try {
    let newService = new Service(req.body);
    let savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// ✅ Update service
exports.updateService = async (req, res) => {
  try {
    let updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};

// ✅ Delete service
exports.deleteService = async (req, res) => {
  try {
    let deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete service",
      error: error.message,
    });
  }
};
