import './App.css';
import React, { useContext } from 'react'
import { UserContext } from './context/UserContext';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import ClientPage from './pages/cliente/ClientPage';
import SellerPage from './pages/seller/SellerPage';
import SignUpPage from './pages/signUp/SignUpPage';

function App() {
  const user = useContext(UserContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage tipo="cliente" />} />
        <Route path="/Cliente" element={<ClientPage />} />
        <Route path="/Vendedor" element={<SellerPage />} />
      </Routes>
    </div>
  );
}

export default App;
