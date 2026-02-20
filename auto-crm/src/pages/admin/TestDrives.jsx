import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { Plus, Trash2, X, Clock, Calendar as CalendarIcon, Car, Mail, Phone } from 'lucide-react';

const TestDrives = () => {
  const [drives, setDrives] = useState([]);
  const [staff, setStaff] = useState([]);
  const [cars, setCars] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [formData, setFormData] = useState({ 
    customer: '', email: '', phone: '', car: '', time: '', status: 'Pending', assignedTo: '' 
  });

  useEffect(() => {
    fetchDrives();
    fetchStaff();
    fetchCars(); 
  }, []);

  const fetchDrives = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/testdrives');
      setDrives(res.data);
    } catch (err) { console.error("Error fetching drives", err); }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setStaff(res.data.filter(u => u.role === 'sales_executive' || u.role === 'admin'));
    } catch (err) { console.error("Error fetching staff", err); }
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
    setFormData({ ...formData, [e.target.id || e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = { ...formData };
      
      // ✅ FIX: જો assignedTo ખાલી હોય (""), તો તેને કાઢી નાખો જેથી MongoDB ObjectId એરર ન આપે
      if (!postData.assignedTo || postData.assignedTo === "") {
        delete postData.assignedTo;
      }

      await axios.post('http://localhost:5000/api/testdrives', postData);
      fetchDrives();
      setIsModalOpen(false);
      setFormData({ customer: '', email: '', phone: '', car: '', time: '', status: 'Pending', assignedTo: '' });
      alert("Test Drive Booked Successfully!");
    } catch (err) { 
      console.error("Booking Error:", err.response?.data);
      alert("Error: " + (err.response?.data?.message || "Booking failed."));
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const driveToUpdate = drives.find(d => d._id === id);
      
      // ૧. જો Reject થાય તો ડિલીટ કરવાનું કન્ફર્મેશન
      if (newStatus === 'Rejected') {
        if (!window.confirm("આ ટેસ્ટ ડ્રાઈવ રીજેક્ટ કરવી છે? રીજેક્ટ કરવાથી તે લિસ્ટમાંથી નીકળી જશે.")) return;
      }

      // ૨. જો Complete થાય તો સ્ટાફ અસાઇન હોવો જરૂરી છે
      if (newStatus === 'Completed') {
        if (!driveToUpdate.assignedTo) {
          alert("પહેલા કોઈ સ્ટાફ (Executive) ને અસાઇન કરો!");
          return;
        }
      }

      await axios.put(`http://localhost:5000/api/testdrives/${id}`, { 
        status: newStatus,
        assignedTo: driveToUpdate.assignedTo?._id 
      });

      fetchDrives();

      if(newStatus === 'Completed') {
        alert("Session Completed! કસ્ટમર હવે Leads માં જોવા મળશે.");
      } else if (newStatus === 'Rejected') {
        alert("ટેસ્ટ ડ્રાઈવ રીજેક્ટ થઈ અને લિસ્ટમાંથી કાઢી નાખી.");
      }
    } catch (err) { console.error("Status update error", err); }
  };

  const updateAssignee = async (id, staffId) => {
    try {
      await axios.put(`http://localhost:5000/api/testdrives/${id}`, { assignedTo: staffId });
      fetchDrives();
    } catch (err) { console.error("Assignee update error", err); }
  };

  const deleteDrive = async (id) => {
    if (window.confirm('Delete this schedule?')) {
      try {
        await axios.delete(`http://localhost:5000/api/testdrives/${id}`);
        fetchDrives();
      } catch (err) { console.error("Delete error", err); }
    }
  };

  const filteredDrives = drives.filter(d => filter === 'All' || d.status === filter);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Test Drive Management" />
        <div className="p-10 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1e293b]">Scheduled Drives</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and track customer test drive sessions.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="px-8 py-3.5 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg shadow-blue-100 flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
              <Plus size={20}/> Book Test Drive
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Pending', 'Approved', 'Completed', 'Rejected'].map(tab => (
              <button key={tab} onClick={() => setFilter(tab)} className={`px-7 py-2.5 rounded-xl text-xs font-bold transition-all border ${filter === tab ? 'bg-[#1e293b] text-white border-[#1e293b] shadow-md' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}>{tab}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrives.map(td => (
              <div key={td._id} className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-xl transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-blue-50 text-[#2b428d] p-4 rounded-2xl group-hover:bg-[#2b428d] group-hover:text-white transition-all"><Car size={22} /></div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border ${td.status === 'Completed' ? 'bg-blue-50 text-blue-600 border-blue-100' : td.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-100' : td.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>{td.status}</span>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-bold text-[#1e293b] text-2xl tracking-tight mb-1 leading-tight">{td.customer}</h4>
                  <p className="text-xs font-extrabold text-[#2b428d] uppercase tracking-wider">{td.car}</p>
                </div>

                <div className="space-y-3 mb-8 text-[11px] font-bold text-gray-400 uppercase tracking-wide border-b border-gray-50 pb-6">
                  <div className="flex items-center gap-3"><CalendarIcon size={14} className="text-blue-300"/> {new Date(td.time).toLocaleDateString()}</div>
                  <div className="flex items-center gap-3"><Clock size={14} className="text-blue-300"/> {new Date(td.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  <div className="flex items-center gap-3"><Phone size={14} className="text-blue-300"/> {td.phone}</div>
                </div>

                <div className="mb-8">
                  <label className="text-[9px] font-bold text-gray-400 uppercase mb-2 block tracking-[0.15em]">Assigned Executive</label>
                  <select value={td.assignedTo?._id || ""} onChange={(e) => updateAssignee(td._id, e.target.value)} className="w-full bg-gray-50 border-gray-100 p-3 rounded-xl text-xs font-bold text-blue-900 outline-none focus:ring-2 focus:ring-blue-100">
                    <option value="">Assign Executive...</option>
                    {staff.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  {td.status === 'Pending' ? (
                    <>
                      <button onClick={() => updateStatus(td._id, 'Approved')} className="flex-1 py-3.5 bg-green-500 text-white rounded-xl text-[11px] font-bold uppercase hover:bg-green-600 transition-all">Approve</button>
                      <button onClick={() => updateStatus(td._id, 'Rejected')} className="px-4 py-3.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">Reject</button>
                    </>
                  ) : td.status === 'Approved' ? (
                    <button onClick={() => updateStatus(td._id, 'Completed')} className="flex-1 py-3.5 bg-[#2b428d] text-white rounded-xl text-[11px] font-bold uppercase hover:bg-blue-800 transition-all">Mark Completed</button>
                  ) : <div className="flex-1 py-3.5 bg-gray-50 text-gray-400 rounded-xl text-[11px] font-bold uppercase text-center border border-gray-100">Session {td.status}</div>}
                  <button onClick={() => deleteDrive(td._id)} className="px-5 py-3.5 bg-gray-50 text-gray-300 rounded-xl hover:text-red-500 transition-all border border-gray-100 hover:border-red-50"><Trash2 size={20}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative animate-zoom">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-600 transition-colors"><X size={24} /></button>
            <h3 className="text-2xl font-bold mb-8 text-[#1e293b]">Schedule New Session</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" id="customer" placeholder="Customer Name" required onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="email" id="email" placeholder="Email Address" onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none" />
                <input type="text" id="phone" placeholder="Phone Number" required onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select id="car" required onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none font-bold">
                  <option value="">Select Car...</option>
                  {cars.length > 0 ? cars.map(car => (<option key={car._id} value={car.modelName}>{car.modelName}</option>)) : <option disabled>No cars available</option>}
                </select>
                <input type="datetime-local" id="time" required onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none font-bold" />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold">Discard</button>
                <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDrives;