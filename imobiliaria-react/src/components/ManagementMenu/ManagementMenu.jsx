import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from './ManagementMenu.module.css';

const ManagementMenu = () => {
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleHomeClick = () => {
    navigate('/gerenciamento'); 
    setIsCadastroOpen(false); 
  };

  return (
    <nav className={styles.managementMenu}>
      <ul className={styles.mainMenu}>
        <li className={styles.menuItem}>
          <Link to="/gerenciamento" className={styles.menuLink} onClick={handleHomeClick}>Home</Link>
        </li>

        <li className={styles.menuItem}>
          <a onClick={() => setIsCadastroOpen(!isCadastroOpen)} className={styles.menuLink}>
            Cadastro {isCadastroOpen ? '▲' : '▼'}
          </a>
          {isCadastroOpen && (
            <ul className={styles.subMenu}>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/imovel" className={styles.menuLink} onClick={() => setIsCadastroOpen(false)}>Cadastro de Imóvel</Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/proprietario" className={styles.menuLink} onClick={() => setIsCadastroOpen(false)}>Cadastro de Proprietário</Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.menuItem}>
          <Link to="/gerenciamento/imovel" className={styles.menuLink}>Imóvel</Link>
        </li>

        <li className={styles.menuItem}>
          <Link to="/gerenciamento/relatorios" className={styles.menuLink}>Relatórios</Link>
        </li>

        <li className={styles.menuItem}>
          <Link to="/gerenciamento/movimentacao" className={styles.menuLink}>Movimentação</Link>
        </li>

        <li className={styles.menuItem}>
          <Link to="/gerenciamento/pessoa" className={styles.menuLink}>Pessoa</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ManagementMenu;