import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ManagementListPage.module.css'; // Usando o novo estilo compartilhado

const BairroListPage = () => {
  const [bairros, setBairros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBairros = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/bairros");
        if (!response.ok) throw new Error('Falha ao buscar bairros');
        const data = await response.json();
        setBairros(data);
      } catch (error) {
        console.error(error.message);
        alert("Não foi possível carregar a lista de bairros.");
      } finally {
        setLoading(false);
      }
    };
    fetchBairros();
  }, []);

  const handleAdd = () => navigate('/gerenciamento/bairro/cadastro');
  const handleEdit = (id) => navigate(`/gerenciamento/bairro/editar/${id}`);
  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o bairro com ID: ${id}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/bairros/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          if (response.status === 500) throw new Error('Não é possível excluir este bairro, pois ele está associado a um ou mais imóveis.');
          throw new Error('Falha ao excluir o bairro.');
        }
        setBairros(bairros.filter(b => b.id !== id));
        alert('Bairro excluído com sucesso!');
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    }
  };

  const filteredBairros = bairros.filter(b =>
    b.id.toString().startsWith(searchTerm) ||
    b.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Bairros</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Filtrar por ID ou Nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={handleAdd} className={`${styles.button} ${styles.addButton}`}>Adicionar Novo</button>
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
            {filteredBairros.length > 0 ? (
              filteredBairros.map(bairro => (
                <tr key={bairro.id}>
                  <td>{bairro.id}</td>
                  <td>{bairro.nome}</td>
                  <td className={styles.actionsCell}>
                    <button onClick={() => handleEdit(bairro.id)} className={`${styles.button} ${styles.editButton}`}>Editar</button>
                    <button onClick={() => handleDelete(bairro.id)} className={`${styles.button} ${styles.deleteButton}`}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className={styles.noResults}>Nenhum bairro encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BairroListPage;
