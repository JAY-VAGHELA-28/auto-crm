const mongoose = require('mongoose');

const buybackSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  carModel: { type: String, required: true },
  regNo: { type: String, required: true },
  mfgYear: { type: Number, required: true },
  kmDriven: { type: Number, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true }, // Manual/Auto
  condition: { type: String, required: true }, // Good/Average/Bad
  autoValuation: { type: Number }, // AI/Logic Generated Price
  status: { type: String, default: 'Pending' }, // Pending/Accepted/Rejected
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Sales Executive id
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Buyback', buybackSchema);