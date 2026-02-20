import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/admin/Dashboard';
import Cars from './pages/admin/Cars';
import Customers from './pages/admin/Customers';  
import AdminLeads from './pages/admin/Leads';
import OldCarPurchase from './pages/admin/OldCarPurchase';
import TestDrives from './pages/admin/TestDrives'; 
import SettingsPage from './pages/admin/SettingsPage';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';
// import Login from './pages/Login';


import SalesDashboard from './pages/sales/Dashboard';
import SalesLeads from './pages/sales/Leads';
import Quotations from './pages/sales/Quotations';
import SalesCustomers from './pages/sales/Customers';
import SalesReports from './pages/sales/Reports';
import SalesTestDrives from './pages/sales/TestDrives';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/cars" element={<Cars />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
       <Route path="/admin/old-car-purchase" element={<OldCarPurchase />} />
       <Route path="/admin/test-drives" element={<TestDrives />} />
       <Route path="/admin/settings" element={<SettingsPage />} />
       <Route path="/admin/user-management" element={<UserManagement />} />
       <Route path="/admin/reports" element={<Reports />} />
       {/* <Route path="/login" element={<Login />} />  */}

        <Route path="/sales/dashboard" element={<SalesDashboard />} />
        <Route path="/sales/leads" element={<SalesLeads />} />
        <Route path="/sales/quotations" element={<Quotations />} />
        <Route path="/sales/customers" element={<SalesCustomers />} />
        <Route path="/sales/reports" element={<SalesReports />} />
        <Route path="/sales/test-drives" element={<SalesTestDrives />} />
        
<Route path="/" element={<Navigate to="/admin/dashboard" />} /> 
     </Routes>
    </Router>
  );
}

export default App;