import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../BairroListPage/BairroListPage.module.css'; // Reutilizando o estilo

const BairroAddPage = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/bairros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      });
      if (!response.ok) throw new Error('Falha ao adicionar o bairro.');
      alert('Bairro adicionado com sucesso!');
      navigate('/gerenciamento/bairros');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Adicionar Novo Bairro</h1>
      <form onSubmit={handleSave} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome do Bairro</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={styles.textInput}
            required
          />
        </div>
        <div className={styles.formActions}>
          <button type="button" onClick={() => navigate('/gerenciamento/bairros')} className={`${styles.button} ${styles.cancelButton}`}>
            Cancelar
          </button>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BairroAddPage;
