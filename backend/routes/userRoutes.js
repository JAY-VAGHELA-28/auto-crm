const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// બધા યુઝર્સ મેળવવા (GET)
router.get("/", userController.getUsers);

// નવો યુઝર ઉમેરવા (POST)
router.post("/", userController.createUser);

// યુઝર ડિલીટ કરવા (DELETE)
router.delete("/:id", userController.deleteUser);

module.exports = router;