import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { Plus, Trash2, UserCircle, X, Shield, Mail, Phone, Briefcase } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'sales_executive', phone: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', formData);
      fetchUsers();
      setIsModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'sales_executive', phone: '' });
    } catch (err) {
      alert("Error adding member");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Remove this team member?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Staff Management" />

        <div className="p-10 overflow-y-auto flex-1">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1e293b]">Team Management</h2>
              <p className="text-sm text-gray-500 mt-1">Control access levels and manage your showroom staff.</p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3.5 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg shadow-blue-100 flex items-center gap-2 hover:opacity-90 transition-all active:scale-95"
            >
              <Plus size={20}/> Add New Member
            </button>
          </div>

          {/* Users Grid Layout (TestDrives જેવી જ Card Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400 font-medium bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                No staff members registered in the system.
              </div>
            ) : (
              users.map(u => (
                <div key={u._id} className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-xl transition-all group relative overflow-hidden">
                  
                  {/* Role Badge - Top Right */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl transition-all ${u.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-[#2b428d]'}`}>
                      {u.role === 'admin' ? <Shield size={22} /> : <Briefcase size={22} />}
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      u.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </div>

                  {/* User Info */}
                  <div className="mb-6">
                    <h4 className="font-bold text-[#1e293b] text-2xl tracking-tight mb-1 leading-tight">{u.name}</h4>
                    <p className="text-xs font-extrabold text-[#2b428d] uppercase tracking-wider">ID: Staff-{u._id.slice(-4)}</p>
                  </div>

                  {/* Contact Details Style */}
                  <div className="space-y-3 mb-8 text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    <div className="flex items-center gap-3"><Mail size={14} className="text-blue-300"/> {u.email}</div>
                    <div className="flex items-center gap-3"><Phone size={14} className="text-blue-300"/> {u.phone || 'No Phone'}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <div className="flex-1 py-3 px-4 bg-gray-50 rounded-xl text-[10px] font-bold text-gray-500 uppercase flex items-center justify-center">
                      Member since {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                    <button 
                      onClick={() => deleteUser(u._id)} 
                      className="px-5 py-3.5 bg-gray-50 text-gray-300 rounded-xl hover:text-red-500 transition-all border border-gray-100 hover:border-red-50"
                    >
                      <Trash2 size={20}/>
                    </button>
                  </div>

                  {/* Decorative Background Icon */}
                  <UserCircle className="absolute -right-4 -bottom-4 text-gray-50 opacity-10 w-24 h-24 rotate-12" />
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* MODAL: TestDrives જેવી જ Styled Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-600 transition-colors"><X size={24} /></button>
            <h3 className="text-2xl font-bold mb-8 text-[#1e293b]">Add New Staff</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                <input 
                  type="text" id="name" required 
                  onChange={handleInputChange} 
                  className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 font-medium transition-all" 
                  placeholder="e.g. Rahul Desai" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                  <input type="email" id="email" required onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" placeholder="name@hyundai.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                  <input type="password" id="password" required onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" placeholder="••••••••" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Phone Number</label>
                  <input type="text" id="phone" onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" placeholder="+91 98XXX XXXXX" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">Access Role</label>
                  <select id="role" onChange={handleInputChange} className="w-full bg-gray-50 text-blue-900 border border-gray-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 font-bold transition-all">
                    <option value="sales_executive">Sales Executive</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">Discard</button>
                <button type="submit" className="flex-1 py-4 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:opacity-95 transition-all">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;