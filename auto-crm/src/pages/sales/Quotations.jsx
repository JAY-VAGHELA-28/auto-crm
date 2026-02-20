import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sales/Sidebar";
import Header from '../../components/sales/Header';
import { Plus, Trash2, X, FileText, Download, Car, ShieldCheck, ChevronLeft } from 'lucide-react';

const Quotations = () => {
  const [evals, setEvals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    customerName: '', phone: '', email: '', carModel: '', regNo: '', 
    mfgYear: '', kmDriven: '', fuelType: 'Petrol', transmission: 'Manual', 
    condition: 'Good', img: '' 
  });

  useEffect(() => { fetchEvals(); }, []);

  const fetchEvals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/buybacks');
      setEvals(res.data);
    } catch (err) { console.error("Error fetching evaluations", err); }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id || e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/buybacks', formData);
      fetchEvals();
      setShowForm(false);
      alert("Valuation request sent to Admin!");
    } catch (err) { alert("Error submitting request"); }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title="Buyback Evaluation" />
        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
          
          {!showForm ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Old Car Valuation</h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">Submit customer's old car details for AI price estimation.</p>
                </div>
                <button onClick={() => setShowForm(true)} className="px-8 py-4 bg-gradient-to-r from-[#1e296b] to-blue-600 text-white rounded-2xl font-bold shadow-lg flex items-center gap-2 hover:scale-[1.02] transition-all">
                  <Plus size={20}/> New Evaluation
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {evals.map(ev => (
                  <div key={ev._id} className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm p-8 hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl"><Car size={24}/></div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${ev.status === 'Accepted' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                        {ev.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-[#1e293b] text-xl mb-1">{ev.carModel}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">{ev.regNo} • {ev.mfgYear}</p>
                    
                    <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                       <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Estimated Value</p>
                       <h5 className="text-2xl font-black text-[#1e296b]">₹{ev.autoValuation?.toLocaleString()}</h5>
                    </div>

                    <div className="text-[11px] font-bold text-gray-500 space-y-2 mb-6">
                        <p>Customer: <span className="text-[#1e293b]">{ev.customerName}</span></p>
                        <p>KM Driven: <span className="text-[#1e293b]">{ev.kmDriven} km</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
               <button onClick={() => setShowForm(false)} className="text-blue-900 font-bold flex items-center gap-2 mb-8 hover:gap-3 transition-all">
                <ChevronLeft size={20} /> Back to List
              </button>

              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-50">
                <h3 className="text-2xl font-black text-[#1e293b] mb-2">Vehicle Details</h3>
                <p className="text-sm text-gray-400 font-medium mb-10">Enter accurate details for best AI valuation.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" id="customerName" placeholder="Customer Name" required onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none focus:ring-4 focus:ring-blue-50" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" id="phone" placeholder="Phone" required onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none" />
                    <input type="text" id="carModel" placeholder="Car Model" required onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" id="regNo" placeholder="Reg No" required onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none" />
                    <input type="number" id="mfgYear" placeholder="Mfg Year" required onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <select id="transmission" onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none">
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                    </select>
                    <input type="number" id="kmDriven" placeholder="KM Driven" required onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-bold outline-none" />
                  </div>

                  <button type="submit" className="w-full py-5 bg-[#1e296b] text-white rounded-2xl font-black shadow-xl hover:opacity-95 transition-all">
                    GET AI VALUATION
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Quotations;