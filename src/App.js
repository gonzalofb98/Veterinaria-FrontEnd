import './App.css';
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import ClientPage from './pages/cliente/ClientPage';
import VendedorPage from './pages/vendedor/VendedorPage';
import ListadoPedidosPage from './pages/vendedor/ListadoPedidosPage';
import ListadoVendedoresPage from './pages/vendedor/ListadoVendedoresPage';
import ListadoClientesPage from './pages/vendedor/ListadoClientesPage';
import SignUpPage from './pages/signUp/SignUpPage';
import RegistrarMascotaPage from './pages/cliente/RegistrarMascotaPage';
import RegistrarPedidoPage from './pages/cliente/RegistrarPedidoPage';
import HistoricoPedidosPage from './pages/cliente/HistoricoPedidosPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUpCliente" element={<SignUpPage tipo="cliente" />} />
        <Route path="/Cliente" element={<ClientPage />} />
        <Route path="/RegistrarMascota" element={<RegistrarMascotaPage />} />
        <Route path="/RegistrarPedido" element={<RegistrarPedidoPage />} />
        <Route path="/HistoricoPedidos" element={<HistoricoPedidosPage />} />
        <Route path="/Vendedor" element={<VendedorPage />} />
        <Route path="/ListadoPedidos" element={<ListadoPedidosPage />} />
        <Route path="/ListadoVendedores" element={<ListadoVendedoresPage />} />
        <Route path="/signUpVendedor" element={<SignUpPage tipo="vendedor" />} />
        <Route path="/ListadoClientes" element={<ListadoClientesPage />} />
      </Routes>
    </div>
  );
}

export default App;
