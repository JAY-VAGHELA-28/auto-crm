const User = require("../models/User");

// બધા યુઝર્સ મેળવવા
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // પાસવર્ડ સિવાયનો ડેટા મોકલવો
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// નવો મેમ્બર એડ કરવા
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// મેમ્બર ડિલીટ કરવા
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Member removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};