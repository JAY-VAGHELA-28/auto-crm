const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");

// બધા લીડ્સ મેળવવા
router.get("/", leadController.getLeads);

// નવી લીડ ઉમેરવા
router.post("/", leadController.createLead);

// લીડ અપડેટ કરવા (Edit/Assign)
router.put("/:id", leadController.updateLead);

// લીડ ડિલીટ કરવા
router.delete("/:id", leadController.deleteLead);

module.exports = router;