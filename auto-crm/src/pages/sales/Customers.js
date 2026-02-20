import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from '../../components/sales/Sidebar';
import Header from '../../components/sales/Header';
import { Plus, Search, User, Mail, Phone, Car, X, ChevronLeft, Eye } from 'lucide-react';

export default function Customers() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);

  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", interested: "", status: "New",
  });

  useEffect(() => {
    fetchCustomers();
    fetchCars();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/customers');
      setCustomers(res.data);
    } catch (err) { console.error("Error fetching customers", err); }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/newcars');
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setCars(res.data.data);
      }
    } catch (err) { console.error("Error fetching cars", err); }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/customers', formData);
      fetchCustomers();
      setShowAddForm(false);
      setFormData({ name: "", phone: "", email: "", interested: "", status: "New" });
      alert("Customer registered successfully!");
    } catch (err) { alert("Error saving customer"); }
  };

  const filteredData = customers.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm)
  );

  const statusColors = {
    'New': 'bg-blue-50 text-blue-600 border-blue-100',
    'Hot Lead': 'bg-red-50 text-red-500 border-red-100',
    'Follow-up': 'bg-orange-50 text-orange-600 border-orange-100',
    'Interested': 'bg-green-50 text-green-600 border-green-100',
    'Completed': 'bg-purple-50 text-purple-600 border-purple-100'
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header title="Customer Directory" />

        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">

          {!showAddForm ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-wrap justify-between items-center mb-10 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Customer Base</h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">Manage and track your official customer directory.</p>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                      type="text"
                      placeholder="Search name or phone..."
                      className="pl-11 pr-5 py-3.5 w-72 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-gradient-to-r from-[#1e296b] to-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center gap-2 hover:scale-[1.02] transition-all active:scale-95"
                  >
                    <Plus size={20} /> Add Customer
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                      <th className="px-8 py-6">Customer Name</th>
                      <th className="px-6 py-6">Contact Info</th>
                      <th className="px-6 py-6">Interested Model</th>
                      <th className="px-6 py-6">Lifecycle Status</th>
                      <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                    {filteredData.length > 0 ? (
                      filteredData.map((cust) => (
                        <tr key={cust._id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-8 py-6 font-bold text-[#1e293b]">{cust.name}</td>
                          <td className="px-6 py-6 text-gray-500 font-medium">{cust.phone}</td>
                          <td className="px-6 py-6">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider">
                              {cust.interested || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[cust.status] || 'bg-gray-100 text-gray-600'}`}>
                              {cust.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button
                              onClick={() => setSelectedCustomer(cust)}
                              className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#1e296b] hover:text-white transition-all shadow-sm"
                            >
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-20 text-gray-400 font-medium">No customer records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
              <button
                onClick={() => setShowAddForm(false)}
                className="text-blue-900 font-bold flex items-center gap-2 mb-8 hover:gap-3 transition-all"
              >
                <ChevronLeft size={20} /> Back to Directory
              </button>

              <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-50 relative">
                <h3 className="text-2xl font-black text-[#1e293b] mb-2">Register New Customer</h3>
                <p className="text-sm text-gray-400 font-medium mb-10">Ensure all details are accurate before saving the profile.</p>

                <form onSubmit={handleAddSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input
                        type="text" placeholder="e.g. Rajesh Patel" required
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 font-bold text-[#1e293b]"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input
                        type="text" placeholder="+91 00000 00000" required
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 font-bold text-[#1e293b]"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input
                        type="email" placeholder="customer@email.com"
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 font-bold text-[#1e293b]"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Vehicle Selection</label>
                      <select
                        required
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 font-bold text-[#1e293b]"
                        value={formData.interested}
                        onChange={(e) => setFormData({ ...formData, interested: e.target.value })}
                      >
                        <option value="">Select Car Model</option>
                        {cars.map(car => (
                          <option key={car._id} value={car.modelName}>{car.modelName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Status</label>
                    <select
                      className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50/50 font-bold text-[#1e293b]"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="New">New Inquiry</option>
                      <option value="Hot Lead">Hot Lead</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Interested">Interested</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1e296b] text-white rounded-2xl font-extrabold text-lg shadow-xl shadow-blue-100 hover:opacity-95 transition-all active:scale-95 mt-4"
                  >
                    SAVE CUSTOMER PROFILE
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md flex justify-center items-center z-[100] p-6">
          <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors"
            >
              <X size={28} />
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-4 text-[#1e296b]">
                <User size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-[#1e293b]">{selectedCustomer.name}</h3>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">Lead for {selectedCustomer.interested || 'N/A'}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Phone size={18} className="text-gray-400" />
                <span className="font-bold text-slate-700">{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Mail size={18} className="text-gray-400" />
                <span className="font-bold text-slate-700">{selectedCustomer.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Car size={18} className="text-gray-400" />
                <span className="font-bold text-slate-700">{selectedCustomer.interested || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl text-white">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Current Status</span>
                <span className="font-black text-xs uppercase tracking-widest text-orange-400">{selectedCustomer.status}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="mt-8 w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}