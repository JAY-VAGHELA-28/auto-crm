const express = require("express");
const router = express.Router();
const buybackController = require("../controllers/buybackController");

// બધા રિક્વેસ્ટ મેળવવા
router.get("/", buybackController.getRequests);

// નવી વેલ્યુએશન રિક્વેસ્ટ ઉમેરવા
router.post("/", buybackController.createRequest);

// સ્ટેટસ અપડેટ કરવા (Accept/Reject)
router.put("/:id", buybackController.updateStatus);

// રેકોર્ડ ડિલીટ કરવા
router.delete("/:id", buybackController.deleteRequest);

module.exports = router;