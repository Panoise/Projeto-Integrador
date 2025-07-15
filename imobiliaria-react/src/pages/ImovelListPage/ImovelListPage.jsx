import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ImovelListPage.module.css';

const ImovelListPage = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchImoveis = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/imoveis");
      if (!response.ok) throw new Error('Falha ao buscar imóveis');
      const data = await response.json();
      setImoveis(data);
    } catch (error) {
      console.error(error.message);
      alert("Não foi possível carregar a lista de imóveis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImoveis();
  }, []);

  const handleToggleDisplay = async (id, currentState) => {
    try {
      const response = await fetch(`http://localhost:8080/api/imoveis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exibirNoSite: !currentState }),
      });
      if (!response.ok) throw new Error('Falha ao atualizar o status de exibição.');
      
      // Atualiza o estado localmente para refletir a mudança instantaneamente
      setImoveis(imoveis.map(imovel => 
        imovel.id === id ? { ...imovel, exibirNoSite: !currentState } : imovel
      ));
      alert('Status de exibição atualizado!');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleEdit = (id) => navigate(`/gerenciamento/imovel/editar/${id}`);
  
  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o imóvel com ID: ${id}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/imoveis/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Falha ao excluir o imóvel.');
        }

        setImoveis(imoveis.filter(imovel => imovel.id !== id));
        alert('Imóvel excluído com sucesso!');

      } catch (error) {
        console.error(error.message);
        alert('Ocorreu um erro ao excluir o imóvel.');
      }
    }
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Lista de Imóveis Cadastrados</h1>
      <div className={styles.imoveisGrid}>
        {imoveis.length > 0 ? (
          imoveis.map(imovel => {
            const primeiraImagem = imovel.imagens && imovel.imagens.length > 0 ? imovel.imagens[0] : null;
            const imageUrl = primeiraImagem ? `http://localhost:8080/${primeiraImagem.caminho.replace(/\\/g, '/')}` : null;
            
            if (imageUrl) {
              console.log(`Carregando imagem para o imóvel ${imovel.id}:`, imageUrl);
            }

            return (
              <div key={imovel.id} className={styles.imovelCard}>
                <div className={styles.imageContainer}>
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={`Imóvel ${imovel.id}`} 
                      className={styles.imovelImage}
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/eee/ccc?text=Erro+ao+Carregar"; }}
                    />
                  ) : (
                    <div className={styles.noImage}>Sem Imagem</div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>Imóvel ID: {imovel.id}</h2>
                  <p><strong>Proprietário:</strong> {imovel.proprietario?.nome || 'N/A'}</p>
                  <p><strong>Endereço:</strong> {imovel.endereco?.rua}, {imovel.endereco?.numero}</p>
                  <p><strong>Bairro:</strong> {imovel.bairro?.nome || 'N/A'}</p>
                  <p><strong>Categoria:</strong> {imovel.categoria?.nome || 'N/A'}</p>
                  <p><strong>Valor:</strong> R$ {parseFloat(imovel.valorVenda).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p><strong>Status:</strong> {imovel.status}</p>
                  <p><strong>Quartos:</strong> {imovel.quantidadeQuartos} | <strong>Banheiros:</strong> {imovel.quantidadeBanheiros} | <strong>Área:</strong> {imovel.metragem} m²</p>
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => handleEdit(imovel.id)} className={`${styles.button} ${styles.editButton}`}>Editar</button>
                  <button 
                    onClick={() => handleToggleDisplay(imovel.id, imovel.exibirNoSite)} 
                    className={`${styles.button} ${imovel.exibirNoSite ? styles.hideButton : styles.showButton}`}
                  >
                    {imovel.exibirNoSite ? 'Ocultar do Site' : 'Exibir no Site'}
                  </button>
                  <button onClick={() => handleDelete(imovel.id)} className={`${styles.button} ${styles.deleteButton}`}>Excluir</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Nenhum imóvel cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default ImovelListPage;
