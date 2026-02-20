import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Car, Users, Contact, CalendarCheck, 
  FileSpreadsheet, ChartLine, UserCog, Settings 
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
    // Background color set to Dark Navy from your image
    <aside className="w-71 bg-[#1e296b] flex flex-col shrink-0 h-screen sticky top-0 shadow-xl">
      {/* Logo Section matching the image */}
      <div className="p-8 flex items-center gap-4">
        <div className="bg-white/10 text-white p-2 rounded-xl font-black text-2xl w-12 h-12 flex items-center justify-center border border-white/20">
          H
        </div>
        <div>
          <h1 className="font-black text-white text-xl leading-none tracking-tighter">
            Hyndai <span className="text-orange-500">CRM</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Hyundai Motors</p>
        </div>
      </div>
      
      {/* Navigation Links - All original links kept */}
      <nav className="flex-1 pr-4 space-y-1 mt-2 overflow-y-auto custom-scrollbar">
        <NavItem to="/admin/dashboard" icon={Home} label="Dashboard" />
        <NavItem to="/admin/cars" icon={Car} label="Car Inventory" />
        <NavItem to="/admin/customers" icon={Users} label="Customers" />
        <NavItem to="/admin/leads" icon={Contact} label="Sales Leads" />
        <NavItem to="/admin/test-drives" icon={CalendarCheck} label="Test Drives" />
        <NavItem to="/admin/old-car-purchase" icon={FileSpreadsheet} label="Old Car Purchase" />
        <NavItem to="/admin/reports" icon={ChartLine} label="Analytics Reports" />
        <NavItem to="/admin/user-management" icon={UserCog} label="User Management" />
        <NavItem to="/admin/settings" icon={Settings} label="System Settings" />
      </nav>

 
    </aside>
  );
};

export default Sidebar;