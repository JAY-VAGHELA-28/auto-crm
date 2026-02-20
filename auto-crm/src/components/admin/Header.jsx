import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronDown, UserCircle, LogOut, LayoutDashboard } from 'lucide-react';

const Header = ({ title }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    // Header background changed to match the clean off-white/light-gray dashboard background
    <header className="h-20 bg-[#f8fafc] flex items-center justify-between px-10 shrink-0 sticky top-0 z-50">
      <div className="font-bold text-[#1e293b] text-xl tracking-tight">
        {/* Matches the "Welcome back" style */}
        {title || <span className="text-gray-500 font-normal">Welcome back, <span className="text-black">Pritesh Sanghvi!</span></span>}
      </div>

      <div className="flex items-center gap-8">
        {/* Search Bar - Styled like your screenshot (white bg, rounded, soft shadow) */}
        <div className="relative w-80 hidden md:block">
          <input 
            type="text" 
            placeholder="Search customer..." 
            className="w-full bg-white border-none shadow-sm rounded-lg py-2.5 pl-4 pr-10 outline-none text-sm text-gray-600 focus:ring-2 focus:ring-blue-100 transition-all" 
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
        </div>

        {/* Profile Section */}
        <div className="relative profile-container">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-4 hover:opacity-90 transition-all outline-none group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#1e293b] leading-none">Alex Kumar</p>
              <p className="text-[11px] text-gray-500 font-medium mt-1">Admin</p>
            </div>
            
            {/* Avatar - Styled with the soft blue/gray look from your UI */}
            <div className="h-11 w-11 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl flex items-center justify-center font-bold shadow-md relative">
              A
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </button>

          {/* Profile Dropdown - Styled with the orange/blue theme accents */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-2">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Switch Dashboard</p>
              </div>
              
              <button 
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/sales/dashboard');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors font-medium text-left group"
              >
                {/* Icon uses your theme blue */}
                <LayoutDashboard size={18} className="text-[#2563eb]" />
                <span>Sales Executive View</span>
              </button>

              <Link 
                to="/user-management" 
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors font-medium"
              >
                <UserCircle size={18} className="text-gray-400" />
                Profile Settings
              </Link>

              <div className="border-t border-gray-50 mt-1 pt-1">
                <Link 
                  to="/login" 
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white bg-gradient-to-r from-[#2b428d] to-[#e67e51] m-2 rounded-lg font-bold shadow-sm"
                >
                  <LogOut size={18} />
                  Sign Out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;