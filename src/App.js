import { Route, Routes } from 'react-router';
import './App.css';
import Login from './auth/login';
import SupplierDashboard from './features/supplier/supplier-dashboard';
import Logout from './auth/logout';
import Admin from './admin/admin-dashboard';
import ExecutiveDashboard from './features/executive/executive-dashboard';
import ManagerDashboard from './features/manager/manager-dashboard';
import CustomerDashboard from './features/customer/customer-dashboard';
import CustomerSignup from './auth/customer-signup';
import ManagerSignUp from './admin/add-manager';
import ExecutiveSignUp from './admin/add-executive';
import SupplierSignUp from './admin/add-supplier';
 
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/supplier' element={<SupplierDashboard />}></Route>
        <Route path='/customersignup' element={<CustomerSignup />}></Route>
        <Route path='/executive' element={<ExecutiveDashboard />}></Route>
        <Route path='/add-executive' element={<ExecutiveSignUp />}></Route>
        <Route path='/add-supplier' element={<SupplierSignUp />}></Route>
        <Route path='/add-manager' element={<ManagerSignUp />}></Route>
        <Route path='/manager' element={<ManagerDashboard />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/customer' element={<CustomerDashboard/>}> </Route>
      </Routes>
  </div>
  );
}

export default App;