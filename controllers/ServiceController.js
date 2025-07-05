const mongoose = require("mongoose");
const Service = require("../models/service");

// Add Service
const addService = async (req, res) => {
  try {
    const {
      image,
      title,
      price,
      area,
      description,
      providerName,
      providerEmail,
      providerImage,
      category,
    } = req.body;

    if (
      !image ||
      !title ||
      !price ||
      !area ||
      !description ||
      !providerEmail ||
      !category
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existingService = await Service.findOne({
      title,
      area,
      providerEmail,
    });

    if (existingService) {
      return res
        .status(409)
        .json({ error: "You already added this service in this area" });
    }

    const newService = new Service({
      image,
      title,
      price,
      area,
      description,
      providerName,
      providerEmail,
      providerImage,
      category,
    });

    await newService.save();
    res
      .status(201)
      .json({ message: "Service added successfully", service: newService });
  } catch (error) {
    res.status(500).json({
      message: "Server error. Try again later.",
      error: error.message,
    });
  }
};

// Get all services;
const getAllService = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// Get Service By Id
const getServiceById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ message: "invalid id" });
  }

  try {
    const service = await Service.findOne({ _id: id });
    if (!service) {
      return res.json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: "internal server error please try again",
      error: error.message,
    });
  }
};

// Get service by Email
const getServiceByEmail = async (req, res) => {
  const { email } = req.user;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email query parameter is required." });
  }

  try {
    const services = await Service.find({ providerEmail: email });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user services" });
  }
};

// Delete service
const deleteService = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Service id is not valid" });
  }

  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res
        .status(404)
        .json({ message: "Service not found or already deleted" });
    }
    res.status(200).json({ message: "Service deleted successfully", service });
  } catch (error) {
    res.status(500).json({ message: "internal error", error: error.message });
  }
};

// Update service
const updateService = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Id" });
  }
  try {
    const updated = await Service.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "service not found" });
    }
    res
      .status(200)
      .json({ message: "service update successfully", service: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update service", error: error.message });
  }
};

const getPaginatedServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    const total = await Service.countDocuments();
    const product = await Service.find().skip(skip).limit(limit);
    
  } catch (error) {}
};

module.exports = {
  addService,
  getAllService,
  getServiceById,
  getServiceByEmail,
  deleteService,
  updateService,
};
