import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logoImage from '../../assets/images/logo.png'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/" className={styles.logoLink}>
                    <img src={logoImage} alt="Logo da Imobiliária" className={styles.logoImg} />
                </Link>
            </div>

            <button
                className={`${styles.hamburgerMenu} ${isOpen ? styles.open : ''}`}
                onClick={toggleMenu}
                aria-label="Abrir Menu"
            >
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </button>

            <div className={`${styles.navAndAuth} ${isOpen ? styles.open : ''}`}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink} onClick={toggleMenu}>Início</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink} onClick={toggleMenu}>Imóveis</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink} onClick={toggleMenu}>Sobre</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink} onClick={toggleMenu}>Contato</Link>
                    </li>
                </ul>

                <div className={styles.authButtonsContainer}>
                    <Link to="/login" className={`${styles.button} ${styles.primaryButton}`} onClick={toggleMenu}>
                        Entrar
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;