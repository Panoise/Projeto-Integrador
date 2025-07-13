
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Minha Casa Imóveis</h3>
          <p className={styles.footerText}>
            Encontrando o lar dos seus sonhos em Chapecó e região.
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.sectionHeading}>Links Úteis</h4>
          <ul className={styles.footerNavList}>
            <li><a href="/" className={styles.footerNavLink}>Imóveis</a></li>
            <li><a href="/" className={styles.footerNavLink}>Sobre</a></li>
            <li><a href="/" className={styles.footerNavLink}>Contato</a></li>
            <li><a href="/" className={styles.footerNavLink}>Política de Privacidade</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.sectionHeading}>Contato</h4>
          <p className={styles.footerText}>
            Rua Sete de Setembro, 44 - Centro<br />
            Chapecó, SC - Brasil<br />
            Telefone: (49) 49 3329-0026<br />
            Email: minhacasaimoveis2@gmail.com 
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Minha Casa Imóveis - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;