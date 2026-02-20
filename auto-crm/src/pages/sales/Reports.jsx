import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sales/Sidebar";
import Header from '../../components/sales/Header';
import { Line, Doughnut } from "react-chartjs-2";
import { 
  FileText, TrendingUp, Target, Award, Clock
} from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement, LineElement, PointElement, LinearScale, 
  CategoryScale, Tooltip, Legend, Filler
);

export default function Reports() {
  const [liveTime, setLiveTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date().toLocaleString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Total Leads Managed", value: 156, icon: <TrendingUp />, color: "bg-blue-600" },
    { label: "Test Drives Conducted", value: 42, icon: <Target />, color: "bg-[#e67e51]" },
    { label: "Closed Sales", value: 18, icon: <Award />, color: "bg-green-600" },
  ];

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Conversions",
        data: [3, 8, 12, 18],
        borderColor: "#e67e51",
        backgroundColor: "rgba(230, 126, 81, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 4,
        pointRadius: 6,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 3,
      },
    ],
  };

  const doughnutData = {
    labels: ["Achieved", "Remaining"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#1e296b", "#f1f5f9"],
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <Header title="Performance Analytics" />

        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar animate-fadeIn">
          
          {/* Header & Live Time */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#1e296b] text-white px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase mb-4 shadow-lg shadow-blue-900/20">
                <Clock size={12} /> Live Status
              </div>
              <h2 className="text-3xl font-black text-[#1e293b] tracking-tight">Sales Report Card</h2>
              <p className="text-sm text-gray-500 mt-1 font-medium">Performance summary for <span className="text-[#e67e51] font-bold">Amit Sutar</span></p>
            </div>
            <div className="text-right hidden md:block">
              <div className="text-sm font-bold text-slate-400">{liveTime}</div>
              <div className="flex items-center justify-end gap-2 text-green-500 text-[10px] font-black tracking-wider mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                SYSTEM ONLINE
              </div>
            </div>
          </div>

          {/* Stats Cards (Premium Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex justify-between items-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div>
                  <h3 className="text-4xl font-black text-[#1e293b]">{stat.value}</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Lead Conversion Line Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50">
              <h3 className="font-bold text-slate-800 text-lg mb-8 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" /> Lead Conversion Trend
              </h3>
              <div className="h-[350px]">
                <Line
                  data={lineData}
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { grid: { display: false }, border: { display: false } },
                      x: { grid: { display: false }, border: { display: false } }
                    }
                  }}
                />
              </div>
            </div>

            {/* Target Achievement Doughnut */}
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 text-center flex flex-col justify-between">
              <h3 className="font-bold text-slate-800 text-lg mb-4">Target Progress</h3>
              
              <div className="relative w-full aspect-square max-w-[220px] mx-auto">
                <Doughnut data={doughnutData} options={{ cutout: "85%", plugins: { legend: { display: false } } }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-[#1e293b]">75%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Reached</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">Next Milestone: <span className="text-[#e67e51] font-bold">20 Sales</span></p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="w-full py-4 bg-[#1e296b] hover:bg-[#2b428d] text-white rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <FileText size={18} /> DOWNLOAD PDF REPORT
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Animation Style */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        `}
      </style>
    </div>
  );
}