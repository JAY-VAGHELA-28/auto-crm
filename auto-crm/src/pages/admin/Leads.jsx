import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { Plus, Trash2, X, Phone, MessageSquare, Globe, CalendarCheck, User, Edit2, Mail } from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [staff, setStaff] = useState([]);
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', phone: '', email: '', car: '', source: 'Web', assignedTo: '', status: 'New' 
  });

  useEffect(() => {
    fetchLeads();
    fetchStaff();
    fetchCars();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leads');
      setLeads(res.data);
    } catch (err) { console.error("Error fetching leads", err); }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setStaff(res.data.filter(u => u.role === 'sales_executive' || u.role === 'admin'));
    } catch (err) { console.error("Error fetching staff", err); }
  };

  const fetchCars = async () => {
    try {
      // અહીં API એન્ડપોઈન્ટ તમારા સર્વર મુજબ ચેક કરી લેજો (/api/newcars અથવા /api/cars)
      const res = await axios.get('http://localhost:5000/api/newcars');
      console.log("Cars API Response:", res.data);

      // જો ડેટા 'data' પ્રોપર્ટીમાં હોય તો (જેમ તમારા Customers કોડમાં હતું)
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setCars(res.data.data);
      } else if (Array.isArray(res.data)) {
        setCars(res.data);
      }
    } catch (err) { 
      console.error("Error fetching cars", err); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/leads/${editId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/leads', formData);
      }
      fetchLeads();
      closeModal();
    } catch (err) { alert("Error saving lead"); }
  };

  const openEditModal = (lead) => {
    setEditId(lead._id);
    setFormData({ 
      name: lead.name, 
      phone: lead.phone, 
      email: lead.email || '', 
      car: lead.car, 
      source: lead.source, 
      assignedTo: lead.assignedTo?._id || '', 
      status: lead.status 
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
    setFormData({ name: '', phone: '', email: '', car: '', source: 'Web', assignedTo: '', status: 'New' });
  };

  const deleteLead = async (id) => {
    if (window.confirm('Delete this lead?')) {
      try {
        await axios.delete(`http://localhost:5000/api/leads/${id}`);
        fetchLeads();
      } catch (err) { console.error("Error deleting lead", err); }
    }
  };

  const filteredLeads = leads.filter(l => filter === 'All' || l.status === filter);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <Header title="Lead Management" />
        <div className="p-10 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1e293b]">Sales Pipeline</h2>
              <p className="text-sm text-gray-500 mt-1">Monitor and nurture your potential car buyers.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="px-8 py-3.5 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg flex items-center gap-2 hover:opacity-90 transition-all">
              <Plus size={20}/> Create New Lead
            </button>
          </div>

          <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'New', 'Interested', 'Follow-up', 'Closed'].map(tab => (
              <button key={tab} onClick={() => setFilter(tab)} className={`px-7 py-2.5 rounded-xl text-xs font-bold border transition-all ${filter === tab ? 'bg-[#1e293b] text-white shadow-md' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>{tab}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLeads.map(lead => (
              <div key={lead._id} className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-blue-50 text-[#2b428d] p-4 rounded-2xl group-hover:bg-[#2b428d] group-hover:text-white transition-all">
                    {lead.source === 'Call' ? <Phone size={22}/> : lead.source === 'WhatsApp' ? <MessageSquare size={22}/> : <Globe size={22}/>}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border ${lead.status === 'Closed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>{lead.status}</span>
                </div>
                <h4 className="font-bold text-[#1e293b] text-2xl tracking-tight mb-1 leading-tight">{lead.name}</h4>
                <p className="text-xs font-extrabold text-[#2b428d] uppercase tracking-wider mb-6">{lead.car}</p>
                
                <div className="space-y-3 mb-8 text-[11px] font-bold text-gray-400 uppercase tracking-wide border-b border-gray-50 pb-6">
                  <p className="flex items-center gap-3"><Phone size={14} className="text-blue-300"/> {lead.phone}</p>
                  <p className="flex items-center gap-3 italic lowercase"><Mail size={14} className="text-blue-300"/> {lead.email || 'no email provided'}</p>
                  <p className="flex items-center gap-3 text-[#2b428d]"><User size={14} className="text-blue-300"/> Assigned: {lead.assignedTo?.name || 'Unassigned'}</p>
                </div>
                
                <div className="flex gap-3">
                  <button onClick={() => openEditModal(lead)} className="flex-1 py-3.5 bg-gray-50 text-gray-700 rounded-xl text-[11px] font-bold uppercase flex justify-center items-center gap-2 hover:bg-gray-100 transition-all"> <Edit2 size={14}/> Edit Lead </button>
                  <button onClick={() => deleteLead(lead._id)} className="px-5 py-3.5 bg-gray-50 text-gray-300 rounded-xl hover:text-red-500 transition-all border border-gray-100 hover:border-red-50"> <Trash2 size={20}/> </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={closeModal} className="absolute top-8 right-8 text-gray-300 hover:text-gray-500"><X size={24}/></button>
            <h3 className="text-2xl font-bold mb-8 text-[#1e293b]">{editId ? 'Manage Lead' : 'New Potential Inquiry'}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Customer Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 font-medium transition-all" placeholder="Rahul Patel" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none" placeholder="rahul@example.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Phone Number</label>
                  <input type="text" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none" placeholder="98765 00000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Car Model</label>
                  <select 
                    value={formData.car} 
                    onChange={(e) => setFormData({...formData, car: e.target.value})} 
                    required 
                    className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none font-bold focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" className="text-gray-400">Select Car Model...</option>
                    {cars && cars.length > 0 ? (
                      cars.map(car => (
                        <option key={car._id} value={car.modelName}>
                          {car.modelName}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading Cars...</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Assign Staff</label>
                  <select value={formData.assignedTo} onChange={(e) => setFormData({...formData, assignedTo: e.target.value})} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none font-bold">
                    <option value="" className="text-gray-400">Assign Staff...</option>
                    {staff.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Inquiry Source</label>
                  <select value={formData.source} onChange={(e) => setFormData({...formData, source: e.target.value})} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none font-bold">
                    <option value="Web">Website</option><option value="Call">Direct Call</option><option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
               {editId && (
  <div>
    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Update Status</label>
    <select 
      value={formData.status} 
      onChange={(e) => setFormData({...formData, status: e.target.value})} 
      className="w-full bg-gray-50 text-blue-900 border-2 border-blue-50 p-4 rounded-xl outline-none font-bold"
    >
      <option value="New">New</option>
      <option value="Interested">Interested</option>
      <option value="Follow-up">Follow-up</option>
      <option value="Closed">Closed (Not Interested)</option>
      <option value="Completed">Completed (Move to Customers)</option> {/* આનાથી ટ્રાન્સફર થશે */}
    </select>
  </div>
)}
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={closeModal} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">Discard</button>
                <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:opacity-95 transition-all">
                  {editId ? 'Update Lead' : 'Finalize Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;