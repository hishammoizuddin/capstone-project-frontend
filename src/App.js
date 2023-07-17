import { Route, Routes } from 'react-router';
import './App.css';
import Login from './auth/login';
import SupplierDashboard from './features/supplier/supplier-dashboard';
import CustomerDashboard from './features/customer/customer-dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/supplier' element={<SupplierDashboard/>}> </Route>
        <Route path='/customer' element={<CustomerDashboard/>}> </Route>
      </Routes>
    </div>
  );
}

export default App;
