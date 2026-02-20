import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from "../../components/admin/Sidebar";
import Header from '../../components/admin/Header';
import { 
  Home, 
  Car, 
  Users, 
  CalendarCheck, 
  ChartLine, 
  Settings, 
  Search, 
  ChevronDown, 
  Calendar, 
  DollarSign, 
  FileText, 
  User, 
  PhoneCall, 
  Trash2,
  Contact,
  FileSpreadsheet,
  UserCog
} from 'lucide-react';

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.add-new-container')) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans">
      <Sidebar /> 
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard Overview" />

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back, Jay Vaghela!</h2>
            <div className="flex gap-3 relative add-new-container">
              <Link to="/reports" className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 transition-all">
                Reports
              </Link>
              
              <div className="relative inline-block text-left">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-5 py-2.5 bg-[#2B438F] text-white rounded-xl font-bold text-sm shadow-lg hover:bg-blue-900 transition-all flex items-center gap-2"
                >
                  + Add New <ChevronDown size={14} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <DropdownItem to="/cars" icon={<Car size={16} className="text-blue-500" />} label="New Car" />
                    <DropdownItem to="/leads" icon={<Contact size={16} className="text-green-500" />} label="New Lead" />
                    <DropdownItem to="/test-drives" icon={<CalendarCheck size={16} className="text-orange-500" />} label="Book Test Drive" />
                    <DropdownItem to="/user-management" icon={<Users size={16} className="text-purple-500" />} label="Sales Executive" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid - Matching side-border theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard label="Today's Follow-ups" value="03" color="border-blue-500" />
            <StatCard label="Pending Leads" value="11" color="border-green-500" />
            <StatCard label="Upcoming Test Drives" value="04" color="border-orange-500" />
            <StatCard label="Assigned Inquiries" value="08" color="border-purple-500" />
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Table Section */}
            <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-bold text-slate-700 tracking-tight">Assigned Leads</h4>
                <Link to="/leads" className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-slate-400 border-b">
                      <th className="pb-4 font-bold">Contact</th>
                      <th className="pb-4 font-bold">Stage</th>
                      <th className="pb-4 font-bold text-right">Reminder</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-5 font-bold text-slate-800">Rajesh Patel</td>
                      <td className="py-5 text-slate-500">Follow-Up</td>
                      <td className="py-5 text-slate-500 text-right">Tomorrow</td>
                    </tr>
                    <tr className="border-b border-gray-50 last:border-0">
                      <td className="py-5 font-bold text-slate-800">Priya Shah</td>
                      <td className="py-5 text-slate-500">Follow-Up</td>
                      <td className="py-5 text-slate-500 text-right">10:00 AM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions & Leads Section */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-slate-700 mb-6">Quick Actions</h4>
                <div className="space-y-4">
                  <button className="w-full py-3.5 border border-gray-100 rounded-2xl text-blue-600 font-bold text-sm hover:bg-gray-50 transition-all">Add New Lead</button>
                  <button className="w-full py-3.5 border border-gray-100 rounded-2xl text-blue-600 font-bold text-sm hover:bg-gray-50 transition-all">View Records</button>
                  <button className="w-full py-4 bg-gradient-to-r from-[#2B438F] to-[#E68A5C] text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-orange-100">
                    Generate New Quotation
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-slate-700 mb-6">Lead Pipeline</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-600">Rajesh Patel</span>
                    <span className="text-sm font-black text-slate-800 tracking-tighter">5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-600">Priya Shah</span>
                    <span className="text-sm font-black text-slate-800 tracking-tighter">10:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Car Management Section */}
          <div className="mt-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xl font-bold text-slate-800 tracking-tight">New Car Management</h4>
                <Link to="/cars" className="text-blue-600 text-xs font-bold uppercase tracking-widest hover:underline">Manage</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CarItem name="Elantra 2024" price="₹22.10 L" img="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=400" />
                <CarItem name="Tucson 2024" price="₹35.00 L" img="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400" />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-lg font-bold text-slate-800 mb-6 tracking-tight">Upcoming Test Drives Analysis</h4>
                <div className="space-y-6">
                  <ProgressBar label="Completed" count="100" color="bg-blue-600" width="w-4/5" />
                  <ProgressBar label="Scheduled" count="50" color="bg-blue-400" width="w-1/2" />
                  <ProgressBar label="Cancelled" count="25" color="bg-blue-300" width="w-1/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components updated for theme ---

const NavItem = ({ to, icon, label, active = false }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-gray-50'}`}
  >
    <span className="w-5 flex justify-center">{icon}</span> {label}
  </Link>
);

const DropdownItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 font-medium border-b border-gray-50 last:border-none">
    <span className="mr-2">{icon}</span> {label}
  </Link>
);

const StatCard = ({ label, value, color }) => {
  return (
    <div className={`bg-white p-6 rounded-2xl border-l-[6px] ${color} shadow-sm flex flex-col justify-center`}>
      <p className="text-slate-500 text-sm font-bold mb-1">{label}</p>
      <h3 className="text-3xl font-black text-slate-800">{value}</h3>
    </div>
  );
};

const CarItem = ({ name, price, img }) => (
  <div className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all">
    <img src={img} alt={name} className="h-32 w-full object-cover rounded-xl mb-4" />
    <h5 className="font-bold text-slate-800">{name}</h5>
    <p className="text-xs text-slate-400 mb-4">{price}</p>
    <div className="flex gap-2">
      <button className="flex-1 py-2 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase border border-gray-100">Enable</button>
      <button className="px-3 py-2 bg-white text-slate-400 rounded-lg border border-gray-100 hover:text-red-500 transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
  </div>
);

const BuybackStat = ({ label, value, color }) => {
  const colors = {
    orange: 'bg-orange-50 border-orange-100',
    blue: 'bg-blue-50 border-blue-100'
  };
  return (
    <div className={`${colors[color]} p-6 rounded-2xl border`}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black text-slate-800">{value}</h3>
    </div>
  );
};

const ProgressBar = ({ label, count, color, width }) => (
  <div>
    <div className="flex justify-between text-[11px] font-bold uppercase mb-2">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-800">{count}</span>
    </div>
    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
      <div className={`${color} h-full ${width}`}></div>
    </div>
  </div>
);

const TestDriveItem = ({ name, detail }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
        <User size={18} />
      </div>
      <div>
        <p className="font-bold text-slate-800">{name}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase">{detail}</p>
      </div>
    </div>
    <button className="px-5 py-2 bg-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
      <PhoneCall size={14} /> Call
    </button>
  </div>
);

export default Dashboard;