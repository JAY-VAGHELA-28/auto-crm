import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../../components/sales/Sidebar";
import Header from "../../components/sales/Header";
import { Plus, Phone, Calendar, Save, ChevronLeft, Clock, Trash2, Mail, Car } from 'lucide-react';

export default function TestDrives() {
  const [showForm, setShowForm] = useState(false);
  const [drives, setDrives] = useState([]);
  const [cars, setCars] = useState([]);
  const [newDrive, setNewDrive] = useState({ 
    customer: "", email: "", phone: "", car: "", time: "", status: "Pending" 
  });

  useEffect(() => {
    fetchDrives();
    fetchCars();
  }, []);

  const fetchDrives = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/testdrives');
      setDrives(res.data);
    } catch (err) { console.error("Error fetching drives", err); }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/newcars');
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setCars(res.data.data);
      } else if (Array.isArray(res.data)) {
        setCars(res.data);
      }
    } catch (err) { console.error("Error fetching cars", err); }
  };

  const handleInputChange = (e) => {
    setNewDrive({ ...newDrive, [e.target.name]: e.target.value });
  };

  const handleAddDrive = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/testdrives', newDrive);
      fetchDrives();
      setShowForm(false);
      setNewDrive({ customer: "", email: "", phone: "", car: "", time: "", status: "Pending" });
      alert(`Test Drive Scheduled for ${newDrive.customer}`);
    } catch (err) {
      alert("Error booking test drive: " + (err.response?.data?.message || "Check fields"));
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/testdrives/${id}`, { status: newStatus });
      fetchDrives();
      alert(`Status updated to ${newStatus}`);
    } catch (err) { console.error("Update error", err); }
  };

  const deleteDrive = async (id) => {
    if (window.confirm('Delete this schedule?')) {
      try {
        await axios.delete(`http://localhost:5000/api/testdrives/${id}`);
        fetchDrives();
      } catch (err) { console.error("Delete error", err); }
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header title="Test Drive Management" />

        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          {!showForm ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Drive Schedule</h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">Manage bookings and capture customer feedback.</p>
                </div>
                <button 
                  onClick={() => setShowForm(true)} 
                  className="px-8 py-4 bg-gradient-to-r from-[#1e296b] to-blue-600 text-white rounded-2xl font-bold shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <Plus size={20}/> Schedule New Drive
                </button>
              </div>

              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {drives.map(drive => (
                  <div key={drive._id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 p-8 hover:shadow-xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0">
                        <div className={`px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${
                            drive.status === 'Completed' ? 'bg-blue-600 text-white' : 
                            drive.status === 'Approved' ? 'bg-green-500 text-white' : 
                            drive.status === 'Rejected' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                            {drive.status}
                        </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-black text-[#1e293b]">{drive.customer}</h3>
                      <p className="text-blue-500 font-bold text-xs mt-1 flex items-center gap-1">
                        <Phone size={12} /> {drive.phone}
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Model</span>
                        <span className="text-sm font-black text-[#1e296b]">{drive.car}</span>
                      </div>
                      <div className="bg-blue-50/50 p-4 rounded-2xl flex flex-col gap-1 border border-blue-50">
                        <div className="flex items-center gap-3">
                          <Calendar size={14} className="text-blue-600" />
                          <span className="text-xs font-bold text-blue-900">{new Date(drive.time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock size={14} className="text-blue-600" />
                          <span className="text-xs font-bold text-blue-900">{new Date(drive.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions based on Status */}
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {drive.status === 'Approved' ? (
                        <button onClick={() => updateStatus(drive._id, 'Completed')} className="col-span-2 py-3 bg-[#1e296b] text-white rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-black transition-colors">
                          <Save size={14}/> Complete Drive
                        </button>
                      ) : drive.status === 'Pending' ? (
                        <div className="col-span-2 text-center py-2 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-lg uppercase border border-orange-100 mb-2">
                          Waiting for Admin Approval
                        </div>
                      ) : null}
                      
                      <button 
                        onClick={() => deleteDrive(drive._id)}
                        className="col-span-2 py-3 bg-red-50 text-red-500 rounded-xl font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={14} /> Cancel Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* ================= FORM VIEW ================= */
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
              <button onClick={() => setShowForm(false)} className="text-blue-900 font-bold flex items-center gap-2 mb-8 hover:gap-3 transition-all">
                <ChevronLeft size={20} /> Back to Schedule
              </button>

              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-50 relative">
                <h3 className="text-2xl font-black text-[#1e293b] mb-2">Book New Drive</h3>
                <p className="text-sm text-gray-400 font-medium mb-10">Select a model and time slot for the customer's test drive.</p>
                
                <form onSubmit={handleAddDrive} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Full Name</label>
                    <input 
                      type="text" required name="customer"
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 font-bold text-[#1e293b]"
                      placeholder="John Doe"
                      value={newDrive.customer}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        type="tel" required name="phone"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]"
                        placeholder="+91"
                        value={newDrive.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" name="email"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]"
                        placeholder="customer@mail.com"
                        value={newDrive.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Car Model</label>
                      <select 
                        required name="car"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]"
                        value={newDrive.car}
                        onChange={handleInputChange}
                      >
                        <option value="">Choose Model...</option>
                        {cars.map(car => <option key={car._id} value={car.modelName}>{car.modelName}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date & Time</label>
                      <input 
                        type="datetime-local" required name="time"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]"
                        value={newDrive.time}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 mt-4 bg-[#1e296b] text-white rounded-2xl font-extrabold text-lg shadow-xl hover:opacity-95 transition-all"
                  >
                    BOOK TEST DRIVE NOW
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}