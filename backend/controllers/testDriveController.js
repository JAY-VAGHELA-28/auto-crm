const TestDrive = require("../models/TestDrive");
const Lead = require("../models/Lead");

// 1. બધા રેકોર્ડ મેળવવા
exports.getDrives = async (req, res) => {
    try {
        const drives = await TestDrive.find()
            .populate('assignedTo', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(drives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. નવું બુકિંગ કરવું
exports.createDrive = async (req, res) => {
    try {
        const newDrive = new TestDrive(req.body);
        await newDrive.save();
        res.status(201).json(newDrive);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// 3. સ્ટેટસ અપડેટ (Reject -> Delete, Complete -> Lead Transfer)
exports.updateDrive = async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    const driveId = req.params.id;

    // Reject થાય તો સીધું Delete
    if (status === 'Rejected') {
      await TestDrive.findByIdAndDelete(driveId);
      return res.status(200).json({ message: "Test Drive Rejected and Deleted" });
    }

    // Complete થાય તો Lead માં Transfer
    if (status === 'Completed') {
      const drive = await TestDrive.findById(driveId);
      if (drive) {
        await Lead.create({
          name: drive.customer,
          phone: drive.phone,
          email: drive.email,
          car: drive.car,
          source: 'Test Drive',
          status: 'Follow-up', 
          assignedTo: assignedTo 
        });

        // Test Drive ને Completed માર્ક કરો
        const updated = await TestDrive.findByIdAndUpdate(driveId, { 
            status: 'Completed', 
            assignedTo: assignedTo 
        }, { new: true });
        
        return res.status(200).json({ message: "Converted to Lead Successfully", data: updated });
      }
    }

    // સામાન્ય અપડેટ (Approve વગેરે)
    const updatedDrive = await TestDrive.findByIdAndUpdate(driveId, req.body, { new: true })
      .populate('assignedTo', 'name');

    res.status(200).json(updatedDrive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 4. મેન્યુઅલ ડિલીટ
exports.deleteDrive = async (req, res) => {
    try {
        await TestDrive.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};