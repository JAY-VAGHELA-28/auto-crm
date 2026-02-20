import React from 'react';
import Sidebar from '../../components/sales/Sidebar';
import Header from '../../components/sales/Header';
import { Link } from 'react-router-dom';

export default function SalesDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* ડાબી બાજુની સાઈડબાર */}
      <Sidebar />

      {/* જમણી બાજુનું મુખ્ય કન્ટેન્ટ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* ઉપરનું હેડર */}
        <Header />

        {/* સ્ક્રોલ કરી શકાય તેવો મેઈન ભાગ */}
        <main className="flex-1 overflow-y-auto p-8 box-border">
          
          {/* સ્ટેટ્સ કાર્ડ્સ (Stats Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-600 hover:shadow-md transition-all">
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Today's Follow-ups</p>
              <h2 className="text-3xl font-black mt-2 text-slate-800">03</h2>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-all">
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Pending Leads</p>
              <h2 className="text-3xl font-black mt-2 text-slate-800">11</h2>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-all">
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Upcoming Test Drives</p>
              <h2 className="text-3xl font-black mt-2 text-slate-800">04</h2>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-600 hover:shadow-md transition-all">
              <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Assigned Inquiries</p>
              <h2 className="text-3xl font-black mt-2 text-slate-800">08</h2>
            </div>
          </div>

          {/* મેઈન ગ્રીડ સેક્શન */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ટેબલ સેક્શન (ડાબી બાજુ) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                  <h3 className="font-black text-slate-800 tracking-tight text-lg">Assigned Leads</h3>
                  <Link to="/sales/leads" className="text-blue-600 text-xs font-bold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    VIEW ALL
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                      <tr className="text-[10px] text-gray-400 font-black uppercase tracking-[0.1em]">
                        <th className="px-6 py-4">Contact Name</th>
                        <th className="px-6 py-4">Stage</th>
                        <th className="px-6 py-4">Reminder</th>
                        <th className="px-6 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-50">
                      <tr className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4 font-bold text-slate-700">Rajesh Patel</td>
                        <td className="px-6 py-4 text-gray-500">Follow-Up</td>
                        <td className="px-6 py-4 text-gray-500">Tomorrow</td>
                        <td className="px-6 py-4 text-right">
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm">Pending</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4 font-bold text-slate-700">Priya Shah</td>
                        <td className="px-6 py-4 text-gray-500">Follow-Up</td>
                        <td className="px-6 py-4 text-gray-500">10:00 AM</td>
                        <td className="px-6 py-4 text-right">
                          <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm">Urgent</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ક્વિક એક્શન્સ અને પાઈપલાઈન (જમણી બાજુ) */}
            <div className="space-y-6">
              {/* ક્વિક એક્શન્સ કાર્ડ */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-black text-slate-800 mb-5 tracking-tight">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/sales/leads" className="flex items-center justify-center w-full py-3.5 rounded-2xl font-bold text-sm bg-slate-50 text-[#1e296b] hover:bg-blue-50 transition-all border border-slate-100">
                    + Add New Lead
                  </Link>
                  <Link to="/sales/quotations" className="flex items-center justify-center w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#1e296b] to-blue-700 shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    GENERATE QUOTATION
                  </Link>
                </div>
              </div>

              {/* લીડ પાઈપલાઈન કાર્ડ */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-black text-slate-800 mb-5 tracking-tight">Lead Pipeline</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-2xl bg-[#f8fafc] border border-slate-50 group hover:border-blue-100 transition-colors">
                     <span className="text-slate-700 font-bold text-sm">Rajesh Patel</span>
                     <span className="text-blue-600 font-black text-[10px] bg-white px-2.5 py-1.5 rounded-xl shadow-sm uppercase tracking-wider">5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-2xl bg-[#f8fafc] border border-slate-50 group hover:border-blue-100 transition-colors">
                     <span className="text-slate-700 font-bold text-sm">Priya Shah</span>
                     <span className="text-blue-600 font-black text-[10px] bg-white px-2.5 py-1.5 rounded-xl shadow-sm uppercase tracking-wider">10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}