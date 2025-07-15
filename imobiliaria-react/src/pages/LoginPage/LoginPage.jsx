// src/pages/LoginPage/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores

    if (!email || !password) {
      setError('Por favor, preencha o email e a senha.');
      return;
    }

    try {
      // 1. Busca o usuário pelo email na API
      const response = await fetch(`http://localhost:8080/api/usuarios/email/${email}`);

      // 2. Verifica se o usuário foi encontrado
      if (!response.ok) {
        if (response.status === 404) {
          setError('Usuário não encontrado.');
        } else {
          setError('Ocorreu um erro no servidor. Tente novamente.');
        }
        return; // Para a execução se o usuário não foi encontrado
      }

      const usuario = await response.json();

      // 3. Compara a senha digitada com a senha do banco
      // Lembre-se: Em um sistema real, a senha seria criptografada.
      // Aqui estamos comparando o texto puro, como está no seu banco agora.
      if (usuario.senha === password) {
        console.log('Login bem-sucedido!', usuario);
        // Login sucesso! Redireciona para a página principal do sistema de gerenciamento.
        navigate('/gerenciamento');
      } else {
        setError('Senha incorreta.');
      }

    } catch (err) {
      console.error('Falha na requisição de login:', err);
      setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
    }
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
          
          {/* Exibe a mensagem de erro, se houver */}
          {error && <p className={styles.errorMessage}>{error}</p>}
          
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
