import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from '../../components/sales/Sidebar';
import Header from '../../components/sales/Header';
import { Plus, Phone, Save, ChevronLeft, Mail, MessageSquare, Globe, Trash2, Edit2 } from 'lucide-react';

export default function Leads() {
  const [showForm, setShowForm] = useState(false);
  const [leads, setLeads] = useState([]);
  const [cars, setCars] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', car: '', source: 'Call', status: 'New'
  });

  useEffect(() => {
    fetchLeads();
    fetchCars();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads');
      setLeads(res.data);
    } catch (err) { console.error("Error fetching leads", err); }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/leads/${editId}`, formData);
      } else {
        // નવી લીડ વખતે સ્ટેટસ હંમેશા 'New' મોકલવું
        await axios.post('http://localhost:5000/api/leads', { ...formData, status: 'New' });
      }
      fetchLeads();
      closeForm();
      alert(formData.status === "Completed" ? "Lead Transferred to Customers!" : "Lead Saved Successfully!");
    } catch (err) { 
      console.error(err.response?.data);
      alert("Error: " + (err.response?.data?.message || "Check all fields")); 
    }
  };

  const openEditForm = (lead) => {
    setEditId(lead._id);
    setFormData({
      name: lead.name,
      phone: lead.phone,
      email: lead.email || '',
      car: lead.car,
      source: lead.source || 'Call',
      status: lead.status
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({ name: '', phone: '', email: '', car: '', source: 'Call', status: 'New' });
  };

  const deleteLead = async (id) => {
    if (window.confirm('Delete this lead?')) {
      try {
        await axios.delete(`http://localhost:5000/api/leads/${id}`);
        fetchLeads();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header title="Sales Pipeline" />

        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          {!showForm ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Lead Directory</h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">Track your potential customers and inquiry stages.</p>
                </div>
                <button 
                  onClick={() => setShowForm(true)} 
                  className="px-8 py-4 bg-gradient-to-r from-[#1e296b] to-blue-600 text-white rounded-2xl font-bold shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <Plus size={20}/> Create New Lead
                </button>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                      <th className="px-8 py-6">Customer Details</th>
                      <th className="px-6 py-6">Vehicle Model</th>
                      <th className="px-6 py-6">Source</th>
                      <th className="px-6 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {leads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="font-bold text-[#1e293b] text-base">{lead.name}</div>
                          <div className="text-xs text-blue-500 font-bold mt-1 flex items-center gap-1">
                            <Phone size={12} /> {lead.phone}
                          </div>
                        </td>
                        <td className="px-6 py-6 font-bold text-slate-700">{lead.car}</td>
                        <td className="px-6 py-6 capitalize font-medium text-slate-500">
                          {lead.source}
                        </td>
                        <td className="px-6 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${lead.status === 'Closed' ? 'bg-red-50 text-red-600 border-red-100' : lead.status === 'Interested' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => openEditForm(lead)} className="p-2.5 bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-xl shadow-sm transition-all"><Edit2 size={16} /></button>
                            <button onClick={() => deleteLead(lead._id)} className="p-2.5 bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white rounded-xl shadow-sm transition-all"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
              <button onClick={closeForm} className="text-blue-900 font-bold flex items-center gap-2 mb-8 hover:gap-3 transition-all"><ChevronLeft size={20} /> Back to Pipeline</button>

              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-50 relative">
                <h3 className="text-2xl font-black text-[#1e293b] mb-2">{editId ? 'Manage Existing Lead' : 'Register New Lead'}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Customer Full Name</label>
                    <input 
                      type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 font-bold text-[#1e293b]" placeholder="Enter name"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]" placeholder="+91 00000 00000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]" placeholder="customer@email.com"
                      />
                    </div>
                  </div>

                  {/* Car & Source */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Car Model</label>
                      <select 
                        required value={formData.car} onChange={(e) => setFormData({...formData, car: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]"
                      >
                        <option value="">Choose Model...</option>
                        {cars.map(car => <option key={car._id} value={car.modelName}>{car.modelName}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Inquiry Source</label>
                      <select value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b]">
                        <option value="Call">Direct Call</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Web">Website</option>
                      </select>
                    </div>
                  </div>

                  {/* Status: Only show during Edit */}
                  {editId && (
                    <div className="space-y-2 animate-in slide-in-from-top-2">
                      <label className="text-[10px] font-black text-[#e67e51] uppercase tracking-widest ml-1">Update Status</label>
                      <select 
                        value={formData.status} 
                        onChange={(e) => setFormData({...formData, status: e.target.value})} 
                        className="w-full bg-orange-50/50 border-2 border-orange-100 p-4 rounded-2xl outline-none font-bold text-[#1e293b] focus:border-[#e67e51]"
                      >
                        <option value="New">New</option>
                        <option value="Interested">Interested</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Closed">Closed (Not Interested)</option>
                        <option value="Completed">Completed (Move to Customers)</option>
                      </select>
                      {formData.status === 'Completed' && (
                        <p className="text-[10px] text-orange-600 font-bold ml-1 italic">* This will move the lead to the Customer list.</p>
                      )}
                    </div>
                  )}

                  <button type="submit" className="w-full py-5 bg-[#1e296b] text-white rounded-2xl font-black text-lg shadow-xl hover:opacity-95 transition-all mt-4 flex items-center justify-center gap-3 uppercase">
                    <Save size={24} /> {editId ? 'Update Lead Profile' : 'Confirm New Lead'}
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