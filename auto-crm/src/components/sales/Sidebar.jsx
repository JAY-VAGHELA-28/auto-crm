import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Contact, CalendarCheck, 
  FileText, ChartLine 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-4 p-3.5 rounded-r-full transition-all duration-300 group mb-1 ${
          isActive 
            ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg' 
            : 'text-slate-300 hover:bg-white/10 hover:text-white'
        }`}
      >
        <span className={`flex justify-center transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        </span>
        <span className={`text-[14px] tracking-tight font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-[#1e296b] flex flex-col shrink-0 h-screen sticky top-0 shadow-xl">
      <div className="p-8 flex items-center gap-4">
        <div className="bg-white/10 text-white p-2 rounded-xl font-black text-2xl w-12 h-12 flex items-center justify-center border border-white/20">
          H
        </div>
        <div>
          <h1 className="font-black text-white text-xl leading-none tracking-tighter">
            Hyundai <span className="text-orange-500">CRM</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Sales Panel</p>
        </div>
      </div>
      
      <nav className="flex-1 pr-4 space-y-1 mt-2 overflow-y-auto">
        <NavItem to="/sales/dashboard" icon={Home} label="Dashboard" />
        <NavItem to="/sales/leads" icon={Contact} label="Leads" />
        <NavItem to="/sales/customers" icon={Users} label="Customers" />
        <NavItem to="/sales/test-drives" icon={CalendarCheck} label="Test Drives" />
        <NavItem to="/sales/quotations" icon={FileText} label="Quotations" />
        <NavItem to="/sales/reports" icon={ChartLine} label="Reports" />
      </nav>
    </aside>
  );
};

export default Sidebar;