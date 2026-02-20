const Lead = require("../models/Lead");
const Customer = require("../models/Customer");

// 1. બધા લીડ્સ મેળવવા (આ ફંક્શન ખૂટતું હતું)
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. નવી લીડ ઉમેરવા (આ ફંક્શન ખૂટતું હતું)
exports.createLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. લીડ અપડેટ કરવા અને કન્વર્ટ કરવા
exports.updateLead = async (req, res) => {
  try {
    const { status } = req.body;

    if (status === 'Completed') {
      const lead = await Lead.findById(req.params.id);
      if (lead) {
        await Customer.create({
          name: lead.name,
          phone: lead.phone,
          email: lead.email,
          interested: lead.car,
          status: 'Converted'
        });
        await Lead.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Success: Lead is now a Customer!" });
      }
    }

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignedTo', 'name');
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. લીડ ડિલીટ કરવા (આ ફંક્શન પણ ખૂટતું હતું)
exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};