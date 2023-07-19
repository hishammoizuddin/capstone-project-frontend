import { Route, Routes } from 'react-router';
import './App.css';
import Login from './auth/login';
import SupplierDashboard from './features/supplier/supplier-dashboard';
import CustomerDashboard from './features/customer/customer-dashboard';
// import Navbar from './features/supplier/navbar';
import Logout from './auth/logout';
import Admin from './admin/admin-dashboard';
import ExecutiveDashboard from './features/executive/executive-dashboard';

function App() {
  return (
    <div>  
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/admin' element={<Admin/>}> </Route>
        <Route path='/supplier' element={<SupplierDashboard/>}> </Route>
        <Route path='/executive' element={<ExecutiveDashboard/>}> </Route>
        <Route path='/customer' element={<CustomerDashboard/>}> </Route>
        <Route path='/logout' element={<Logout/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;
