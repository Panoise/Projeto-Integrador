import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ManagementListPage.module.css'; // Usando o novo estilo compartilhado

const CaracteristicaListPage = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCaracteristicas = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/caracteristicas");
        if (!response.ok) throw new Error('Falha ao buscar características');
        const data = await response.json();
        setCaracteristicas(data);
      } catch (error) {
        console.error(error.message);
        alert("Não foi possível carregar a lista de características.");
      } finally {
        setLoading(false);
      }
    };
    fetchCaracteristicas();
  }, []);

  const handleAdd = () => navigate('/gerenciamento/caracteristica/cadastro');
  const handleEdit = (id) => navigate(`/gerenciamento/caracteristica/editar/${id}`);
  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir a característica com ID: ${id}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/caracteristicas/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          if (response.status === 500) throw new Error('Não é possível excluir esta característica, pois ela está associada a um ou mais imóveis.');
          throw new Error('Falha ao excluir a característica.');
        }
        setCaracteristicas(caracteristicas.filter(c => c.id !== id));
        alert('Característica excluída com sucesso!');
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    }
  };

  const filteredCaracteristicas = caracteristicas.filter(c =>
    c.id.toString().startsWith(searchTerm) ||
    c.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Características</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Filtrar por ID ou Nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={handleAdd} className={`${styles.button} ${styles.addButton}`}>Adicionar Nova</button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredCaracteristicas.length > 0 ? (
              filteredCaracteristicas.map(caracteristica => (
                <tr key={caracteristica.id}>
                  <td>{caracteristica.id}</td>
                  <td>{caracteristica.nome}</td>
                  <td className={styles.actionsCell}>
                    <button onClick={() => handleEdit(caracteristica.id)} className={`${styles.button} ${styles.editButton}`}>Editar</button>
                    <button onClick={() => handleDelete(caracteristica.id)} className={`${styles.button} ${styles.deleteButton}`}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className={styles.noResults}>Nenhuma característica encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaracteristicaListPage;
