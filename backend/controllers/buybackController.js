const Buyback = require('../models/Buyback');

// 1. બધી રિક્વેસ્ટ ફેચ કરવી
exports.getRequests = async (req, res) => {
  try {
    const data = await Buyback.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. નવી રિક્વેસ્ટ બનાવી (AI Valuation Logic સાથે)
exports.createRequest = async (req, res) => {
  try {
    const { mfgYear, kmDriven, condition } = req.body;

    // ડેટા ટાઇપ સુરક્ષા માટે Number માં કન્વર્ટ કરો
    const year = parseInt(mfgYear);
    const km = parseInt(kmDriven);

    // --- AI/Logic for Valuation ---
    let basePrice = 700000; // નવી ગાડીની એવરેજ બેઝ પ્રાઈઝ
    let currentYear = new Date().getFullYear();
    let age = currentYear - year;

    // ૧. Depreciation: વર્ષ દીઠ 10% કિંમત ઘટાડો
    let valuation = basePrice * Math.pow(0.90, age); 

    // ૨. KM Factor: દર 10,000 કિમીએ 2% કિંમત ઘટાડો
    let kmFactor = (km / 10000) * 0.02; 
    valuation = valuation * (1 - kmFactor);

    // ૩. Condition Factor: કન્ડિશન મુજબ એડજસ્ટમેન્ટ
    if (condition === 'Average') valuation *= 0.85; // 15% ઘટાડો
    if (condition === 'Bad') valuation *= 0.65;     // 35% ઘટાડો
    // 'Good' માટે 100% કિંમત ગણાશે

    const newRequest = new Buyback({
      ...req.body,
      mfgYear: year,
      kmDriven: km,
      autoValuation: Math.round(valuation) // રાઉન્ડ ફિગર
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 3. સ્ટેટસ અપડેટ (Reject -> Delete, Accept -> Status Update)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    
    // જો એડમિન 'Rejected' સિલેક્ટ કરે તો રેકોર્ડ સીધો ડિલીટ થશે
    if (status === 'Rejected') {
      await Buyback.findByIdAndDelete(id);
      return res.status(200).json({ message: "Rejected and Deleted Successfully" });
    }

    // બાકીના અપડેટ (Accepted) માટે
    const updated = await Buyback.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 4. મેન્યુઅલ ડિલીટ ફંક્શન
exports.deleteRequest = async (req, res) => {
  try {
    await Buyback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Record Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};