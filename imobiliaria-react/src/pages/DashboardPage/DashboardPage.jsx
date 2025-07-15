import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';

// Ícones simples em SVG para os cards
const ImovelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ProprietarioIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;


const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalImoveis: 0,
    totalProprietarios: 0,
    totalUsuarios: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Busca os dados das 3 APIs em paralelo
        const [imoveisRes, proprietariosRes, usuariosRes] = await Promise.all([
          fetch("http://localhost:8080/api/imoveis"),
          fetch("http://localhost:8080/api/proprietarios"),
          fetch("http://localhost:8080/api/usuarios")
        ]);

        // --- CORREÇÃO AQUI: Verificando cada resposta antes de processar ---
        const imoveisData = imoveisRes.ok ? await imoveisRes.json() : [];
        const proprietariosData = proprietariosRes.ok ? await proprietariosRes.json() : [];
        const usuariosData = usuariosRes.ok ? await usuariosRes.json() : [];

        setStats({
          totalImoveis: imoveisData.length,
          totalProprietarios: proprietariosData.length,
          totalUsuarios: usuariosData.length,
        });

      } catch (error) {
        console.error("Falha ao buscar estatísticas para o dashboard:", error);
        // Opcional: Adicionar um estado de erro para mostrar uma mensagem na tela
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Carregando dashboard...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Painel de Controle</h1>

      {/* Seção de Cards com as Métricas */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.cardIcon}><ImovelIcon /></div>
          <div className={styles.cardInfo}>
            <span className={styles.cardNumber}>{stats.totalImoveis}</span>
            <span className={styles.cardLabel}>Imóveis Cadastrados</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.cardIcon}><ProprietarioIcon /></div>
          <div className={styles.cardInfo}>
            <span className={styles.cardNumber}>{stats.totalProprietarios}</span>
            <span className={styles.cardLabel}>Proprietários</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.cardIcon}><UserIcon /></div>
          <div className={styles.cardInfo}>
            <span className={styles.cardNumber}>{stats.totalUsuarios}</span>
            <span className={styles.cardLabel}>Usuários do Sistema</span>
          </div>
        </div>
      </div>

      {/* Seção de Acesso Rápido */}
      <div className={styles.quickLinksSection}>
        <h2 className={styles.sectionTitle}>Acesso Rápido</h2>
        <div className={styles.linksGrid}>
          <button onClick={() => navigate('/gerenciamento/imovel/cadastro')} className={styles.quickLink}>
            Cadastrar Novo Imóvel
          </button>
          <button onClick={() => navigate('/gerenciamento/proprietario/cadastro')} className={styles.quickLink}>
            Cadastrar Proprietário
          </button>
          <button onClick={() => navigate('/gerenciamento/imoveis')} className={styles.quickLink}>
            Ver Lista de Imóveis
          </button>
          <button onClick={() => navigate('/gerenciamento/bairros')} className={styles.quickLink}>
            Gerenciar Bairros
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
