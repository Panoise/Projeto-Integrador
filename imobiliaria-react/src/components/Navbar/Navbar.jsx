// src/components/Navbar/Navbar.jsx
import React from "react";
import styles from "./Navbar.module.css";
import logoImage from "../../assets/images/logoMini.png";

const Navbar = () => {

  const handleCreateAccountClick = () => {
    alert("Funcionalidade em desenvolvimento!")
  };
  const handleLoginClick = () => {
    alert("Funcionalidade em desenvolvimento!")
  };

  return (
      <nav className={styles.navbar}>
      <div className={styles.logo}>
        <a href="/" className={styles.logoLink}>
          <img src={logoImage} alt="Logo da Imobiliária" className={styles.logoImg} />
        </a>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="/" className={styles.navLink}>Alugar</a>
        </li>
        <li className={styles.navItem}>
          <a href="/imoveis" className={styles.navLink}>Comprar</a> 
        </li>
        <li className={styles.navItem}>
          <a href="/sobre" className={styles.navLink}>Lançamentos</a> 
        </li>
        <li className={styles.navItem}>
          <a href="/contato" className={styles.navLink}>Descobrir</a> 
        </li>
                <li className={styles.navItem}>
          <a href="/contato" className={styles.navLink}>Anunciar</a>
        </li>
                <li className={styles.navItem}>
          <a href="/contato" className={styles.navLink}>Sobre</a> 
        </li>
      </ul>
      <div className={styles.authButtonsContainer}> {/* Contêiner para os botões */}
          {/* Botão "Criar conta" - preenchido */}
          <button
            className={`${styles.button} ${styles.primaryButton}`}
            onClick={handleCreateAccountClick}
          >
            Criar conta
          </button>

          {/* Botão "Entrar" - contornado com ícone */}
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={handleLoginClick}
          >
            <span className={styles.iconPlaceholder}>👤</span> Entrar
          </button>
        </div>
    </nav>
  );
};

export default Navbar;