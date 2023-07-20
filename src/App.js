import { Route, Routes } from 'react-router';
import './App.css';
import Login from './auth/login';
import SupplierDashboard from './features/supplier/supplier-dashboard';
import Logout from './auth/logout';
import Admin from './admin/admin-dashboard';
import ExecutiveDashboard from './features/executive/executive-dashboard';
import ManagerDashboard from './features/manager/manager-dashboard';
 
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/supplier' element={<SupplierDashboard />}></Route>
        <Route path='/executive' element={<ExecutiveDashboard />}></Route>
        <Route path='/manager' element={<ManagerDashboard />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
      </Routes>
  </div>
  );
}

export default App;