import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserCheck, Mail, X } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // સીધું ડેશબોર્ડ પર મોકલે છે
    navigate('/dashboard');
  };

  const toggleModal = (e) => {
    if (e) e.preventDefault(); // લિંક પર ક્લિક કરવાથી પેજ રીફ્રેશ ના થાય
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden flex min-h-[600px] animate-zoom">
        
        {/* Left Side: Branding (Exactly like your HTML) */}
        <div className="hidden md:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            alt="Hyundai Car"
          />
          <div className="relative z-10 p-12 text-white">
            <div className="bg-white/20 backdrop-blur-md p-3 w-fit rounded-2xl mb-6 border border-white/20">
              <span className="font-black tracking-tighter text-2xl">HYUNDAI</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase leading-tight text-white">
              Empowering Your Dealership Performance
            </h2>
            <p className="text-blue-100 opacity-80 font-medium">
              Manage leads, track sales, and grow your business with AutoDesk CRM.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Welcome Back</h3>
              <p className="text-slate-400 font-medium mt-1">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="alex@hyundai.com" 
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    placeholder="••••••••" 
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all font-medium"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <label className="flex items-center gap-2 text-xs text-slate-500 font-bold cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-blue-600 focus:ring-blue-500" /> 
                  Remember me
                </label>
                {/* Forgot Password પર ક્લિક કરવાથી મોડલ ખુલશે */}
                <button type="button" onClick={toggleModal} className="text-xs text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer">
                  Forgot Password?
                </button>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Sign In to Dashboard
              </button>
            </form>

            <p className="text-center text-sm text-slate-400 mt-10 font-medium">
              Don't have an account? 
              <button onClick={toggleModal} className="text-blue-600 font-bold hover:underline ml-1 bg-transparent border-none cursor-pointer">Contact Admin</button>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Admin Modal (For both Forgot Password & Don't have an account) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-zoom text-center relative">
            <button onClick={toggleModal} className="absolute top-6 right-6 text-slate-300 hover:text-slate-600">
                <X size={24} />
            </button>
            
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserCheck size={40} />
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter mb-2">Contact Admin</h3>
            <p className="text-slate-500 text-sm mb-8 font-medium">Please reach out to the administrator to create your account or reset access.</p>
            
            <div className="space-y-3">
              <a 
                href="https://wa.me/918000095553?text=Hello%20Admin,%20I%20need%20access%20to%20the%20Hyundai%20CRM." 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100"
              >
                <span className="text-xl">💬</span> 
                Chat on WhatsApp
              </a>
              
              <a 
                href="mailto:admin@hyundai-autodesk.com?subject=CRM%20Access%20Request" 
                className="flex items-center justify-center gap-3 w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
              >
                <Mail size={20} /> Send an Email
              </a>
              
              <button onClick={toggleModal} className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors mt-2 bg-transparent border-none">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;