const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    interested: {
      type: String, // કારનું મોડેલ સ્ટોર કરવા માટે
    },
    status: {
      type: String,
      default: "Completed", // New, Hot Lead, Follow-up, Interested, Completed
    }
  },
  {
    timestamps: true, // createdAt અને updatedAt આપમેળે ઉમેરાશે
  }
);

module.exports = mongoose.model("Customer", customerSchema);