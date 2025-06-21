
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Minha Casa Imóveis</h3>{/*Colocar o PNG da logo aqui*/}
          <p className={styles.footerText}>
            Encontrando o lar dos seus sonhos em Chapecó e região.
          </p>
          <div className={styles.socialIcons}>

            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <span role="img" aria-label="Facebook">{/*Falta colocar o ícone das redes sociais*/}</span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <span role="img" aria-label="Instagram">{/*Falta colocar o ícone das redes sociais*/}</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <span role="img" aria-label="LinkedIn">{/*Falta colocar o ícone das redes sociais*/}</span>
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4 className={styles.sectionHeading}>Links Úteis</h4>
          <ul className={styles.footerNavList}>
            <li><a href="/imoveis" className={styles.footerNavLink}>Imóveis</a></li>
            <li><a href="/sobre" className={styles.footerNavLink}>Sobre Nós</a></li>
            <li><a href="/contato" className={styles.footerNavLink}>Contato</a></li>
            <li><a href="/politica-de-privacidade" className={styles.footerNavLink}>Política de Privacidade</a></li>
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
        <p>&copy; {new Date().getFullYear()} Minha Casa Imóveis. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;