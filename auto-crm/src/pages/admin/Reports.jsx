import React from 'react';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { 
  Download, BarChart3, PieChart, TrendingUp, FileText, ArrowUpRight 
} from 'lucide-react';

const Reports = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Analytics & Reports" />

        <div className="p-10 overflow-y-auto flex-1">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#1e293b]">System Analytics</h2>
              <p className="text-sm text-gray-500 mt-1">Review and export detailed dealership performance metrics.</p>
            </div>
            <button className="px-8 py-3.5 bg-gradient-to-r from-[#2b428d] to-[#e67e51] text-white rounded-xl font-bold shadow-lg shadow-blue-50 flex items-center gap-2 hover:opacity-90 transition-all active:scale-95">
              <Download size={20}/> Export All Data
            </button>
          </div>

          {/* Color-Themed Report Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReportCard 
              title="Monthly Sales" 
              desc="Comprehensive breakdown of units sold this month." 
              icon={<TrendingUp size={28} />} 
              gradient="from-[#059669] to-[#10b981]" // Emerald
              shadow="shadow-green-100"
            />
            <ReportCard 
              title="Lead Conversion" 
              desc="Analysis of lead-to-customer success ratios." 
              icon={<PieChart size={28} />} 
              gradient="from-[#1d4ed8] to-[#3b82f6]" // Ocean Blue
              shadow="shadow-blue-100"
            />
            <ReportCard 
              title="Inventory Value" 
              desc="Valuation of current stock and vehicle assets." 
              icon={<BarChart3 size={28} />} 
              gradient="from-[#6d28d9] to-[#8b5cf6]" // Royal Purple
              shadow="shadow-purple-100"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const ReportCard = ({ title, desc, icon, gradient, shadow }) => (
  <div className={`group relative bg-gradient-to-br ${gradient} p-10 rounded-[2.5rem] ${shadow} hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border-b-4 border-black/10`}>
    
    {/* Glassy Overlay Pattern */}
    <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-700" />
    
    <div className="relative z-10">
      <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 text-white shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
        {icon}
      </div>

      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-white text-2xl tracking-tight">{title}</h4>
        <ArrowUpRight className="text-white/40 group-hover:text-white transition-colors" size={20} />
      </div>
      
      <p className="text-white/80 text-sm font-medium leading-relaxed mb-10 min-h-[40px]">
        {desc}
      </p>
      
      <button className="w-full py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] hover:bg-white hover:text-[#1e293b] transition-all flex items-center justify-center gap-2">
        <FileText size={16} />
        Generate Detailed PDF
      </button>
    </div>
  </div>
);

export default Reports;