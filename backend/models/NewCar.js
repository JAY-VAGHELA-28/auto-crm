const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    modelName: { type: String, required: true },
    variant: { type: String }, // આ ફિલ્ડ ઉમેર્યું કારણ કે તમે ફોર્મમાં વાપરો છો
    exPrice: { type: Number, required: true }, // ટૂંકું નામ રાખ્યું
    rtoCharges: { type: Number, required: true },
    insuranceCharges: { type: Number, required: true },
    accessoriesCharges: { type: Number, required: true },
    carImg: { type: String, required: true }, // 🔹 સિંગલ સ્ટ્રિંગ
    specifications: {
      engine: String,
      mileage: String,
      transmission: String,
      fuelType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewCar", carSchema);