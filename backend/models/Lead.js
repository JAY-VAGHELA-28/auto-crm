const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String }, // આ ઈમેઈલ ફિલ્ડ એડ કર્યું
  car: { type: String, required: true },
  source: { type: String, enum: ['Web', 'Call', 'WhatsApp'], default: 'Web' },
  status: { type: String, enum: ['New', 'Interested', 'Follow-up', 'Closed', 'Completed'], default: 'New' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, default: () => new Date().toLocaleDateString() }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);