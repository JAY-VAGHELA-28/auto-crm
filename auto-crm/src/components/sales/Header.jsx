import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ChevronDown, UserCircle, LogOut, ShieldCheck } from 'lucide-react';

const Header = ({ title }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-[#f8fafc] flex items-center justify-between px-10 shrink-0 sticky top-0 z-50">
      <div className="font-bold text-[#1e293b] text-xl tracking-tight">
        {/* Sales Person Name */}
        {title || <span className="text-gray-500 font-normal">Welcome back, <span className="text-black">Pritesh Sanghvi!</span></span>}
      </div>

      <div className="flex items-center gap-8">
        {/* Search Bar */}
        <div className="relative w-80 hidden md:block">
          <input 
            type="text" 
            placeholder="Search customer or leads..." 
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
              <p className="text-sm font-bold text-[#1e293b] leading-none">Pritesh Sanghvi</p>
              <p className="text-[11px] text-orange-500 font-bold mt-1 uppercase tracking-wider">Sales Executive</p>
            </div>
            
            {/* Avatar - Matches your theme */}
            <div className="h-11 w-11 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-xl flex items-center justify-center font-bold shadow-md relative">
              P
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <ChevronDown size={12} className={`text-gray-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden py-2">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">Control Panel</p>
              </div>
              
              {/* Switch to Admin Dashboard */}
              <button 
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/admin/dashboard');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors font-medium text-left group"
              >
                <ShieldCheck size={18} className="text-orange-500" />
                <span>Switch to Admin View</span>
              </button>

              <Link 
                to="/sales/profile" 
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors font-medium"
              >
                <UserCircle size={18} className="text-gray-400" />
                My Profile
              </Link>

              <div className="border-t border-gray-50 mt-1 pt-1">
                <Link 
                  to="/login" 
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white bg-[#1e296b] m-2 rounded-lg font-bold shadow-sm text-center justify-center hover:bg-opacity-90 transition-all"
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