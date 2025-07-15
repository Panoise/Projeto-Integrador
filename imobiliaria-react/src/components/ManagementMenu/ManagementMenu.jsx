import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import styles from './ManagementMenu.module.css';

const ManagementMenu = () => {
  const [isImovelOpen, setIsImovelOpen] = useState(false);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);

  const handleLinkClick = () => {
    setIsImovelOpen(false);
    setIsCadastroOpen(false);
  };

  return (
    <nav className={styles.managementMenu}>
      <ul className={styles.mainMenu}>
        <li className={styles.menuItem}>
          <Link to="/gerenciamento" className={styles.menuLink} onClick={handleLinkClick}>Home</Link>
        </li>

        <li className={styles.menuItem}>
          <a onClick={() => setIsImovelOpen(!isImovelOpen)} className={styles.menuLink}>
            Imóveis {isImovelOpen ? '▲' : '▼'}
          </a>
          {isImovelOpen && (
            <ul className={styles.subMenu}>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/imoveis" className={styles.menuLink} onClick={handleLinkClick}>
                  Listar Imóveis
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/imovel/cadastro" className={styles.menuLink} onClick={handleLinkClick}>
                  Cadastrar Imóvel
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.menuItem}>
          <a onClick={() => setIsCadastroOpen(!isCadastroOpen)} className={styles.menuLink}>
            Cadastros {isCadastroOpen ? '▲' : '▼'}
          </a>
          {isCadastroOpen && (
            <ul className={styles.subMenu}>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/proprietarios" className={styles.menuLink} onClick={handleLinkClick}>
                  Gerenciar Proprietários
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/bairros" className={styles.menuLink} onClick={handleLinkClick}>
                  Gerenciar Bairros
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/categorias" className={styles.menuLink} onClick={handleLinkClick}>
                  Gerenciar Categorias
                </Link>
              </li>
              <li className={styles.subMenuItem}>
                <Link to="/gerenciamento/caracteristicas" className={styles.menuLink} onClick={handleLinkClick}>
                  Gerenciar Características
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.menuItem}>
          <Link to="/gerenciamento/relatorios" className={styles.menuLink} onClick={handleLinkClick}>Relatórios</Link>
        </li>

        <li className={styles.menuItem}>
          <Link to="/gerenciamento/movimentacao" className={styles.menuLink} onClick={handleLinkClick}>Movimentação</Link>
        </li>

        <li className={styles.menuItem}>
          <Link to="/gerenciamento/pessoa" className={styles.menuLink} onClick={handleLinkClick}>Pessoa</Link>
        </li>
      </ul>
    </nav>
  );
};

export default ManagementMenu;
