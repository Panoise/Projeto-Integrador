import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../CaracteristicaListPage/CaracteristicaListPage.module.css'; // Reutilizando o estilo

const CaracteristicaEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaracteristica = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/caracteristicas/${id}`);
        if (!response.ok) throw new Error('Característica não encontrada');
        const data = await response.json();
        setNome(data.nome);
      } catch (error) {
        console.error(error);
        alert('Falha ao carregar a característica.');
      } finally {
        setLoading(false);
      }
    };
    fetchCaracteristica();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/caracteristicas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      });
      if (!response.ok) throw new Error('Falha ao atualizar a característica.');
      alert('Característica atualizada com sucesso!');
      navigate('/gerenciamento/caracteristicas');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Editando Característica (ID: {id})</h1>
      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome da Característica</label>
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
          <button type="button" onClick={() => navigate('/gerenciamento/caracteristicas')} className={`${styles.button} ${styles.cancelButton}`}>
            Cancelar
          </button>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default CaracteristicaEditPage;
