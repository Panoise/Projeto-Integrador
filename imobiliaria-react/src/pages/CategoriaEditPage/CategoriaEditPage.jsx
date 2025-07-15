import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../CategoriaListPage/CategoriaListPage.module.css'; // Reutilizando o estilo

const CategoriaEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categorias/${id}`);
        if (!response.ok) throw new Error('Categoria não encontrada');
        const data = await response.json();
        setNome(data.nome);
      } catch (error) {
        console.error(error);
        alert('Falha ao carregar a categoria.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategoria();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/categorias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      });
      if (!response.ok) throw new Error('Falha ao atualizar a categoria.');
      alert('Categoria atualizada com sucesso!');
      navigate('/gerenciamento/categorias');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Editando Categoria (ID: {id})</h1>
      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome da Categoria</label>
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
          <button type="button" onClick={() => navigate('/gerenciamento/categorias')} className={`${styles.button} ${styles.cancelButton}`}>
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

export default CategoriaEditPage;
