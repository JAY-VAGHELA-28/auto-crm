const mongoose = require("mongoose");

const testDriveSchema = new mongoose.Schema({
  customer: { type: String, required: true }, // કસ્ટમરનું નામ
  email: { type: String },
  phone: { type: String, required: true },
  car: { type: String, required: true }, // કારનું મોડેલ
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Completed', 'Rejected'], 
    default: 'Pending' 
  },
  time: { type: Date, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assignedExecutive
}, { timestamps: true });

module.exports = mongoose.model("TestDrive", testDriveSchema);