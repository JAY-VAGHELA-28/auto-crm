const express = require("express");
const router = express.Router();
const testDriveController = require("../controllers/testDriveController");

router.get("/", testDriveController.getDrives);
router.post("/", testDriveController.createDrive);
router.put("/:id", testDriveController.updateDrive);
router.delete("/:id", testDriveController.deleteDrive);

module.exports = router;