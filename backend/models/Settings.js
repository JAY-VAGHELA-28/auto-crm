const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  name: { type: String, default: "Hyundai Auto" },
  email: { type: String, default: "contact@hyundai-autodesk.com" },
  phone: { type: String, default: "+91 98765 00000" },
  rto: { type: Number, default: 10 },
  insurance: { type: Number, default: 3 },
}, { timestamps: true });

module.exports = mongoose.model("Settings", SettingsSchema);
