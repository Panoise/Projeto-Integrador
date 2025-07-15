import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ManagementListPage.module.css'; // Usando o novo estilo compartilhado

const ProprietarioListPage = () => {
  const [proprietarios, setProprietarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProprietarios = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/proprietarios");
        if (!response.ok) throw new Error('Falha ao buscar proprietários');
        const data = await response.json();
        setProprietarios(data);
      } catch (error) {
        console.error(error.message);
        alert("Não foi possível carregar a lista de proprietários.");
      } finally {
        setLoading(false);
      }
    };
    fetchProprietarios();
  }, []);

  const handleAdd = () => navigate('/gerenciamento/proprietario/cadastro');
  const handleEdit = (id) => navigate(`/gerenciamento/proprietario/editar/${id}`);
  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o proprietário com ID: ${id}? Esta ação não pode ser desfeita.`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/proprietarios/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Falha ao excluir o proprietário.');
        setProprietarios(proprietarios.filter(p => p.id !== id));
        alert('Proprietário excluído com sucesso!');
      } catch (error) {
        console.error(error.message);
        alert('Ocorreu um erro ao excluir o proprietário.');
      }
    }
  };

  const filteredProprietarios = proprietarios.filter(p =>
    p.id.toString().startsWith(searchTerm) ||
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Gerenciar Proprietários</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Filtrar por ID ou Nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button onClick={handleAdd} className={`${styles.button} ${styles.addButton}`}>
          Adicionar Novo
        </button>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProprietarios.length > 0 ? (
              filteredProprietarios.map(proprietario => (
                <tr key={proprietario.id}>
                  <td>{proprietario.id}</td>
                  <td>{proprietario.nome}</td>
                  <td>{proprietario.cpf}</td>
                  <td>{proprietario.email}</td>
                  <td className={styles.actionsCell}>
                    <button onClick={() => handleEdit(proprietario.id)} className={`${styles.button} ${styles.editButton}`}>Editar</button>
                    <button onClick={() => handleDelete(proprietario.id)} className={`${styles.button} ${styles.deleteButton}`}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className={styles.noResults}>Nenhum proprietário encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProprietarioListPage;
