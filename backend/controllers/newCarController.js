const NewCar = require("../models/NewCar");


// CREATE
exports.createCar = async (req, res) => {
  try {
    const car = await NewCar.create(req.body);
    res.status(201).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET ALL
exports.getAllCars = async (req, res) => {
  try {
    const cars = await NewCar.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET SINGLE
exports.getCarById = async (req, res) => {
  try {
    const car = await NewCar.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE
exports.updateCar = async (req, res) => {
  try {
    const car = await NewCar.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// DELETE
exports.deleteCar = async (req, res) => {
  try {
    const car = await NewCar.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
