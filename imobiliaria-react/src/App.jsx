import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ManagementLayout from './layouts/ManagementLayout/ManagementLayout'; 
import PropertyRegistrationPage from './pages/PropertyRegistrationPage/PropertyRegistrationPage';
import ProprietarioRegistrationPage from './pages/ProprietarioRegistrationPage/ProprietarioRegistrationPage';

const ManagementDashboardPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Bem-vindo ao Gerenciamento!</div>;
const CadastroPessoaPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Página de Cadastro de Pessoa em construção.</div>;
const RelatoriosPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Página de Relatórios em construção.</div>;
const MovimentacaoPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Página de Movimentação em construção.</div>;
const PessoaPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Página de Gestão de Pessoas em construção.</div>;


import Footer from './components/Footer/Footer';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const noHeaderFooterPaths = [
    '/login',
    '/gerenciamento', 
  ];

  const showHeaderFooter = !noHeaderFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="App">
      {showHeaderFooter && <Navbar />}
      <main style={{ flexGrow: 1, paddingTop: showHeaderFooter ? '80px' : '0' }}>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/gerenciamento" element={<ManagementLayout />}>
            <Route index element={<ManagementDashboardPage />} /> 
            <Route path="imovel" element={<PropertyRegistrationPage />} /> 
            <Route path="proprietario" element={<ProprietarioRegistrationPage />} /> 
            <Route path="pessoa" element={<PessoaPage />} />
            <Route path="relatorios" element={<RelatoriosPage />} />
            <Route path="movimentacao" element={<MovimentacaoPage />} />
            <Route path="*" element={<ManagementDashboardPage />} />
          </Route>
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;