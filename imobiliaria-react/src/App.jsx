import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Importe seus componentes e páginas
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ManagementLayout from './layouts/ManagementLayout/ManagementLayout'; 
import PropertyRegistrationPage from './pages/PropertyRegistrationPage/PropertyRegistrationPage';
import ProprietarioRegistrationPage from './pages/ProprietarioRegistrationPage/ProprietarioRegistrationPage';
import ImovelListPage from './pages/ImovelListPage/ImovelListPage';
import PropertyEditPage from './pages/PropertyEditPage/PropertyEditPage';
import ProprietarioListPage from './pages/ProprietarioListPage/ProprietarioListPage';
import ProprietarioEditPage from './pages/ProprietarioEditPage/ProprietarioEditPage';
import BairroListPage from './pages/BairroListPage/BairroListPage';
import BairroEditPage from './pages/BairroEditPage/BairroEditPage';
import BairroAddPage from './pages/BairroAddPage/BairroAddPage';
import CategoriaListPage from './pages/CategoriaListPage/CategoriaListPage';
import CategoriaEditPage from './pages/CategoriaEditPage/CategoriaEditPage';
import CategoriaAddPage from './pages/CategoriaAddPage/CategoriaAddPage';
import CaracteristicaListPage from './pages/CaracteristicaListPage/CaracteristicaListPage';
import CaracteristicaEditPage from './pages/CaracteristicaEditPage/CaracteristicaEditPage';
import CaracteristicaAddPage from './pages/CaracteristicaAddPage/CaracteristicaAddPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

import './App.css';

// Componentes de página provisórios
const RelatoriosPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Página de Relatórios em construção.</div>;
const MovimentacaoPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Página de Movimentação em construção.</div>;
const PessoaPage = () => <div style={{padding: '40px', fontSize: '1.5em'}}>Página de Gestão de Pessoas em construção.</div>;

// Componente interno para gerenciar o layout condicional
const AppContent = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ['/login', '/gerenciamento'];
  const showHeaderFooter = !noHeaderFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="App">
      {showHeaderFooter && <Navbar />}
      <main style={{ flexGrow: 1, paddingTop: showHeaderFooter ? '80px' : '0' }}>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas de Gerenciamento Aninhadas */}
          <Route path="/gerenciamento" element={<ManagementLayout />}>
            
            <Route index element={<DashboardPage />} /> 
            
            {/* Imóveis */}
            <Route path="imovel/cadastro" element={<PropertyRegistrationPage />} /> 
            <Route path="imoveis" element={<ImovelListPage />} />
            <Route path="imovel/editar/:id" element={<PropertyEditPage />} />
            
            {/* Proprietários */}
            <Route path="proprietario/cadastro" element={<ProprietarioRegistrationPage />} /> 
            <Route path="proprietarios" element={<ProprietarioListPage />} />
            <Route path="proprietario/editar/:id" element={<ProprietarioEditPage />} />

            {/* Cadastros Gerais */}
            <Route path="bairros" element={<BairroListPage />} />
            <Route path="bairro/editar/:id" element={<BairroEditPage />} />
            <Route path="bairro/cadastro" element={<BairroAddPage />} />
            <Route path="categorias" element={<CategoriaListPage />} />
            <Route path="categoria/editar/:id" element={<CategoriaEditPage />} />
            <Route path="categoria/cadastro" element={<CategoriaAddPage />} />
            <Route path="caracteristicas" element={<CaracteristicaListPage />} />
            <Route path="caracteristica/editar/:id" element={<CaracteristicaEditPage />} />
            <Route path="caracteristica/cadastro" element={<CaracteristicaAddPage />} />

            {/* Outras Rotas */}
            <Route path="pessoa" element={<PessoaPage />} />
            <Route path="relatorios" element={<RelatoriosPage />} />
            <Route path="movimentacao" element={<MovimentacaoPage />} />
            
            <Route path="*" element={<DashboardPage />} />
          </Route>
        </Routes>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
};

// Componente principal
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
