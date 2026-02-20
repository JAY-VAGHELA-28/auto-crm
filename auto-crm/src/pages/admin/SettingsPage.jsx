import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { Building, Calculator, Save, Mail, Phone, Percent } from 'lucide-react';
import axios from 'axios';

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", rto: 0, insurance: 0
  });

  const API_URL = "http://localhost:5000/api/settings";

  // Fetch settings from backend
  const fetchSettings = async () => {
    try {
      const res = await axios.get(API_URL);
      setFormData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL, formData);
      alert("Settings synced successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings!");
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="System Configuration" />

        <div className="p-10 overflow-y-auto flex-1">
          <form onSubmit={handleSave} className="space-y-10 max-w-5xl">
            
            {/* Business Profile */}
            <div className="bg-blue-50/40 p-10 rounded-[2.5rem] border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-500">
              <h3 className="text-lg font-bold text-[#2b428d] mb-8 flex items-center gap-3">
                <Building size={20} className="text-blue-500" />
                Dealership Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 relative group">
                  <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2 ml-1">Official Trading Name</label>
                  <input 
                    type="text" id="name" value={formData.name} onChange={handleChange} 
                    placeholder="Enter dealership name"
                    className="w-full bg-white text-blue-900 border border-transparent p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium shadow-sm" 
                  />
                </div>
                
                <div className="relative group">
                  <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" size={18} />
                    <input 
                      type="email" id="email" value={formData.email} onChange={handleChange} 
                      placeholder="contact@dealership.com"
                      className="w-full bg-white text-blue-900 border border-transparent py-4 pl-12 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium shadow-sm" 
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-2 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" size={18} />
                    <input 
                      type="text" id="phone" value={formData.phone} onChange={handleChange} 
                      placeholder="+91 00000 00000"
                      className="w-full bg-white text-blue-900 border border-transparent py-4 pl-12 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 transition-all font-medium shadow-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Price Calculation */}
            <div className="bg-orange-50/40 p-10 rounded-[2.5rem] border border-orange-100/50 shadow-sm hover:shadow-md transition-all duration-500">
              <h3 className="text-lg font-bold text-[#e67e51] mb-8 flex items-center gap-3">
                <Calculator size={20} className="text-orange-500" />
                Price Calculation Variables
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <label className="block text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-2 ml-1">RTO Fees (%)</label>
                  <div className="relative">
                    <Percent className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-200" size={16} />
                    <input 
                      type="number" id="rto" value={formData.rto} onChange={handleChange} 
                      className="w-full bg-white text-[#2b428d] border border-transparent p-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-200 font-bold transition-all shadow-sm" 
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] mb-2 ml-1">Insurance Base (%)</label>
                  <div className="relative">
                    <Percent className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-200" size={16} />
                    <input 
                      type="number" id="insurance" value={formData.insurance} onChange={handleChange} 
                      className="w-full bg-white text-[#2b428d] border border-transparent p-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-200 font-bold transition-all shadow-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 pb-12">
              <button type="submit" className="px-14 py-4 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-3 uppercase tracking-widest text-xs">
                <Save size={18} /> Update Configuration
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
