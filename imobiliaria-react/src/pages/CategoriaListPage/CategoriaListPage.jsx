import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ManagementListPage.module.css'; // Usando o novo estilo compartilhado

const CategoriaListPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/categorias");
        if (!response.ok) throw new Error('Falha ao buscar categorias');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error(error.message);
        alert("Não foi possível carregar a lista de categorias.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  const handleAdd = () => navigate('/gerenciamento/categoria/cadastro');
  const handleEdit = (id) => navigate(`/gerenciamento/categoria/editar/${id}`);
  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria com ID: ${id}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/categorias/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          if (response.status === 500) throw new Error('Não é possível excluir esta categoria, pois ela está associada a um ou mais imóveis.');
          throw new Error('Falha ao excluir a categoria.');
        }
        setCategorias(categorias.filter(c => c.id !== id));
        alert('Categoria excluída com sucesso!');
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      }
    }
  };

  const filteredCategorias = categorias.filter(c =>
    c.id.toString().startsWith(searchTerm) ||
    c.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Categorias</h1>
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
            {filteredCategorias.length > 0 ? (
              filteredCategorias.map(categoria => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nome}</td>
                  <td className={styles.actionsCell}>
                    <button onClick={() => handleEdit(categoria.id)} className={`${styles.button} ${styles.editButton}`}>Editar</button>
                    <button onClick={() => handleDelete(categoria.id)} className={`${styles.button} ${styles.deleteButton}`}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className={styles.noResults}>Nenhuma categoria encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriaListPage;
