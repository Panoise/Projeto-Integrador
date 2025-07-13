// src/pages/LoginPage/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    console.log('Tentativa de Login:', { email, password });

    // <--- CORREÇÃO AQUI: Mude para a rota correta do cadastro de imóvel
    navigate('/gerenciamento/imovel'); // O caminho completo para o cadastro de imóvel

    // Se você quiser que o botão de "Entrar" na tela de login leve para a Home do gerenciamento (o Dashboard):
    // navigate('/gerenciamento');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Entrar</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>
        <p className={styles.forgotPassword}>Esqueceu a senha?</p>
      </div>
    </div>
  );
};

export default LoginPage;