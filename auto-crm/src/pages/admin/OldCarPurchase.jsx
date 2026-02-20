import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { 
  Plus, Trash2, X, Download, Car, ShieldCheck
} from 'lucide-react';

const OldCarPurchase = () => {
  const [evals, setEvals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [formData, setFormData] = useState({ 
    customerName: '', phone: '', email: '', carModel: '', regNo: '', 
    mfgYear: '', kmDriven: '', fuelType: 'Petrol', transmission: 'Manual', 
    condition: 'Good', img: '' // અહીં ઈમેજ URL સ્ટોર થશે
  });

  useEffect(() => { fetchEvals(); }, []);

  const fetchEvals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/buybacks');
      setEvals(res.data);
    } catch (err) { console.error("Error fetching evaluations", err); }
  };

  const handleInputChange = (e) => {
    // ID મુજબ સ્ટેટ અપડેટ થશે
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // સર્વર પર ડેટા મોકલતી વખતે ખાતરી કરો કે img ફિલ્ડમાં પ્રોપર URL છે
      await axios.post('http://localhost:5000/api/buybacks', formData);
      fetchEvals();
      setIsModalOpen(false);
      resetForm();
      alert("Valuation request submitted!");
    } catch (err) { 
      console.error(err);
      alert("Error submitting request"); 
    }
  };

  const resetForm = () => {
    setFormData({ 
      customerName: '', phone: '', email: '', carModel: '', regNo: '', 
      mfgYear: '', kmDriven: '', fuelType: 'Petrol', transmission: 'Manual', 
      condition: 'Good', img: '' 
    });
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/buybacks/${id}`, { status });
      fetchEvals();
    } catch (err) { console.error(err); }
  };

  const deleteEval = async (id) => {
    if (window.confirm('Delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/buybacks/${id}`);
        fetchEvals();
      } catch (err) { console.error(err); }
    }
  };

  const generatePDF = (ev) => {
    const doc = new jsPDF();
    doc.setFillColor(43, 66, 141);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("VEHICLE VALUATION REPORT", 105, 25, { align: "center" });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Customer Name: ${ev.customerName}`, 15, 55);
    doc.text(`Date: ${new Date(ev.createdAt).toLocaleDateString()}`, 150, 55);
    doc.autoTable({
      startY: 65,
      head: [['Field', 'Details']],
      body: [
        ['Car Model', ev.carModel],
        ['Registration No', ev.regNo],
        ['Mfg Year', ev.mfgYear],
        ['KM Driven', `${ev.kmDriven} km`],
        ['Condition', ev.condition],
        ['Transmission', ev.transmission],
        ['Fuel Type', ev.fuelType],
      ],
      theme: 'grid',
      headStyles: { fillColor: [43, 66, 141] }
    });
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFillColor(248, 250, 252);
    doc.rect(15, finalY, 180, 30, 'F');
    doc.setFontSize(14);
    doc.setTextColor(230, 126, 81);
    doc.text("Estimated Valuation Price:", 25, finalY + 18);
    doc.setFontSize(22);
    doc.text(`INR ${ev.autoValuation?.toLocaleString()}`, 110, finalY + 20);
    doc.save(`Valuation_${ev.regNo}.pdf`);
  };

  const inputClass = "w-full bg-blue-50/50 text-blue-900 border border-blue-100 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all placeholder:text-blue-300 font-medium";

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title="Old Car Purchase" />
        <div className="p-10 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1e293b]">Buyback Evaluations</h2>
              <p className="text-sm text-gray-500 mt-1">AI-Powered second-hand car valuation system.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="px-8 py-3.5 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
              <Plus size={20}/> New Evaluation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {evals.filter(e => filter === 'All' || e.status === filter).map(ev => (
              <div key={ev._id} className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="relative h-48 bg-gray-200">
                  {/* ઈમેજ રેન્ડરિંગ લોજિક - જો img ખાલી હોય તો ડિફોલ્ટ પ્લેસહોલ્ડર દેખાશે */}
                  <img 
                    src={ev.img && ev.img !== "" ? ev.img : 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt="car"
                    // જો URL ખોટી હોય તો ડિફોલ્ટ ઈમેજ લોડ થશે
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800' }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg ${ev.status === 'Accepted' ? 'bg-green-500' : ev.status === 'Rejected' ? 'bg-red-500' : 'bg-orange-500'}`}>
                      {ev.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h4 className="font-bold text-[#1e293b] text-2xl mb-1">{ev.carModel}</h4>
                  <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6">{ev.regNo} • {ev.mfgYear}</p>
                  
                  <div className="bg-blue-50/50 p-4 rounded-3xl mb-8 border border-blue-100/50 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black text-blue-400 uppercase mb-1">AI Valuation</p>
                      <h5 className="text-2xl font-black text-[#2b428d]">₹{ev.autoValuation?.toLocaleString()}</h5>
                    </div>
                    <ShieldCheck className="text-blue-200" size={32}/>
                  </div>

                  <div className="flex gap-3">
                    {ev.status === 'Pending' ? (
                      <>
                        <button onClick={() => updateStatus(ev._id, 'Accepted')} className="flex-1 py-3 bg-green-500 text-white rounded-xl text-[10px] font-bold uppercase transition-all">Accept</button>
                        <button onClick={() => updateStatus(ev._id, 'Rejected')} className="flex-1 py-3 bg-red-500 text-white rounded-xl text-[10px] font-bold uppercase transition-all">Reject</button>
                      </>
                    ) : (
                      <button onClick={() => generatePDF(ev)} className="flex-1 py-3 bg-[#1e293b] text-white rounded-xl text-[10px] font-bold uppercase flex items-center justify-center gap-2">
                        <Download size={14}/> Download Quotation
                      </button>
                    )}
                    <button onClick={() => deleteEval(ev._id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-gray-600 transition-colors"><X size={24} /></button>
            <h3 className="text-2xl font-bold mb-8 text-[#1e293b]">Vehicle Valuation Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" id="customerName" value={formData.customerName} placeholder="Full Name" required onChange={handleInputChange} className={`col-span-2 ${inputClass}`} />
                <input type="text" id="phone" value={formData.phone} placeholder="Phone Number" required onChange={handleInputChange} className={inputClass} />
                <input type="email" id="email" value={formData.email} placeholder="Email Address" onChange={handleInputChange} className={inputClass} />
                <input type="text" id="carModel" value={formData.carModel} placeholder="Car Model (Swift VXI)" required onChange={handleInputChange} className={inputClass} />
                <input type="text" id="regNo" value={formData.regNo} placeholder="Reg No (GJ-13...)" required onChange={handleInputChange} className={inputClass} />
                <input type="number" id="mfgYear" value={formData.mfgYear} placeholder="Mfg Year (2020)" required onChange={handleInputChange} className={inputClass} />
                <input type="number" id="kmDriven" value={formData.kmDriven} placeholder="KM Driven" required onChange={handleInputChange} className={inputClass} />
                
                <select id="transmission" value={formData.transmission} onChange={handleInputChange} className={`${inputClass} font-bold cursor-pointer`}>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
                <select id="condition" value={formData.condition} onChange={handleInputChange} className={`${inputClass} font-bold cursor-pointer`}>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Bad">Bad</option>
                </select>
                {/* ઈમેજ URL ઈનપુટ */}
                <input 
                  type="text" 
                  id="img" 
                  value={formData.img} 
                  placeholder="Paste Car Image URL here" 
                  onChange={handleInputChange} 
                  className={`col-span-2 ${inputClass}`} 
                />
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-2xl font-bold shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98]">
                Calculate Valuation & Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OldCarPurchase;