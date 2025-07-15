import React from 'react';
import { Outlet } from 'react-router-dom';
import ManagementMenu from '../../components/ManagementMenu/ManagementMenu'; // Verifique se este caminho está correto
import styles from './ManagementLayout.module.css'; 

const ManagementLayout = () => {
  return (
    <div className={styles.managementPageWrapper}>
      {/* Esta div pode ser o container geral do seu layout */}
      <div className={styles.managementContainer}>
        
        {/* A barra lateral com o menu de navegação */}
        <aside className={styles.sidebar}>
            <ManagementMenu /> 
        </aside>

        {/* A área principal onde o conteúdo das outras páginas será renderizado */}
        <main className={styles.managementContentArea}>
          {/* O <Outlet /> é o componente do React Router que funciona como um 
            espaço reservado. É aqui que o React vai "desenhar" a página 
            de listagem de imóveis, o formulário de cadastro, etc. 
          */}
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default ManagementLayout;
