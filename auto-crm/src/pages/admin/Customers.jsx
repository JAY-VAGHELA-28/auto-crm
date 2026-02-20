import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { Plus, Trash2, X, Edit2 } from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', interested: '', status: 'New'
  });

  useEffect(() => {
    fetchCustomers();
    fetchCars();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers", err);
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/newcars');
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setCars(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching cars", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/customers/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/customers', formData);
      }
      fetchCustomers();
      closeModal();
    } catch (err) {
      alert("Error saving customer data");
    }
  };

  const openAddModal = () => {
    setEditId(null);
    setFormData({ name: '', email: '', phone: '', interested: '', status: 'New' });
    setIsModalOpen(true);
  };

  const openEditModal = (cust) => {
    setEditId(cust._id);
    setFormData({
      name: cust.name,
      email: cust.email,
      phone: cust.phone,
      interested: cust.interested,
      status: cust.status || 'New'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        alert("Failed to delete customer");
      }
    }
  };

  const statusColors = {
    'New': 'bg-blue-50 text-blue-600 border-blue-100',
    'Hot Lead': 'bg-red-50 text-red-500 border-red-100',
    'Follow-up': 'bg-orange-50 text-orange-600 border-orange-100',
    'Interested': 'bg-green-50 text-green-600 border-green-100',
    'Completed': 'bg-purple-50 text-purple-600 border-purple-100'
  };

  const filtered = customers.filter(c =>
    (c.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (c.phone || "").includes(searchQuery)
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header title="Customer Relationship" />

        <div className="p-10 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1e293b]">Customer Database</h2>
              <p className="text-base text-gray-500 mt-1">Manage leads and customer profiles with enhanced tracking.</p>
            </div>

            <button
              onClick={openAddModal}
              className="px-10 py-4 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-2xl font-bold shadow-xl flex items-center gap-3 transition-transform active:scale-95"
            >
              <Plus size={24} /> Add New Customer
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-gray-50 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#fcfdfe] text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50">
                <tr>
                  <th className="px-10 py-8">Customer info</th>
                  <th className="px-10 py-8">Interested Model</th>
                  <th className="px-10 py-8">Status</th>
                  <th className="px-10 py-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-32 text-center text-gray-400 text-lg font-medium">No records found in the database.</td>
                  </tr>
                ) : (
                  filtered.map(c => (
                    <tr key={c._id} className="hover:bg-blue-50/40 transition-all group">
                      <td className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1e293b] text-xl mb-1 group-hover:text-[#2b428d] transition-colors">{c.name}</span>
                          <span className="text-sm font-medium text-gray-400 tracking-wide">{c.phone} • {c.email}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="px-5 py-2.5 bg-blue-50 text-[#2b428d] rounded-xl text-sm font-bold border border-blue-100">
                          {c.interested || 'Not Specified'} 
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border shadow-sm ${statusColors[c.status] || 'bg-gray-100 text-gray-600'}`}>
                          {c.status || 'Completed'}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex justify-end gap-4">
                          <button onClick={() => openEditModal(c)} className="p-3 text-gray-400 hover:text-[#2b428d] hover:bg-white rounded-2xl shadow-none hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                            <Edit2 size={20} />
                          </button>
                          <button onClick={() => deleteCustomer(c._id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-white rounded-2xl shadow-none hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal remains the same but with larger text for consistency */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className=" bg-white w-full max-w-xl rounded-[3rem] p-12 shadow-2xl relative animate-zoom">
            <button onClick={closeModal} className="absolute top-10 right-10 text-gray-300 hover:text-gray-500 transition-colors">
              <X size={28} />
            </button>
            <h3 className="text-3xl font-black mb-10 text-[#1e293b] tracking-tight">{editId ? 'Update Record' : 'Create New Profile'}</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text" id="name" value={formData.name} onChange={handleInputChange} required
                placeholder="Customer Full Name"
                className="w-full bg-blue-50/50 text-blue-900 border border-blue-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 font-bold transition-all"
              />

              <div className="grid grid-cols-2 gap-5">
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} required placeholder="Email Address" className="w-full bg-blue-50/50 text-blue-900 border border-blue-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 font-medium" />
                <input type="text" id="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Phone Number" className="w-full bg-blue-50/50 text-blue-900 border border-blue-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 font-medium" />
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-3">Interested Car Model</label>
                <select
                  id="interested"
                  value={formData.interested}
                  onChange={handleInputChange}
                  required
                  className="w-full text-blue-900 bg-blue-50/50 border border-blue-100 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-400 font-bold cursor-pointer"
                >
                  <option value="">Select Car Model</option>
                  {cars.map(car => (
                    <option key={car._id} value={car.modelName}>{car.modelName}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-5 pt-8">
                <button type="button" onClick={closeModal} className="flex-1 py-5 text-gray-400 font-black uppercase tracking-widest text-xs">Cancel</button>
                <button type="submit" className="flex-1 py-5 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
                  {editId ? 'Update Record' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;