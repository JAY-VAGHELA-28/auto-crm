const express = require("express");
const router = express.Router();

const {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} = require("../controllers/newCarController");

router.post("/", createCar);
router.get("/", getAllCars);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
