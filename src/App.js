// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import Products from './components/Productmaster';
import Orders from './components/Ordermaster';
import Suppliers from './components/Suppliermaster';
import Dashboard1 from './components/Dashboard1';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard1" element={<Dashboard1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
