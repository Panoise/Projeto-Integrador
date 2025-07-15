import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../components/PropertyRegistrationForm/PropertyRegistrationForm.module.css'; // Caminho ajustado

const PropertyEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados do formulário
  const [proprietario, setProprietario] = useState('');
  const [bairro, setBairro] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [status, setStatus] = useState('');
  const [finalidade, setFinalidade] = useState('');
  const [quantidadeQuartos, setQuantidadeQuartos] = useState('');
  const [quantidadeBanheiros, setQuantidadeBanheiros] = useState('');
  const [metragem, setMetragem] = useState('');
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');
  const [caracteristicasSelecionadas, setCaracteristicasSelecionadas] = useState([]);
  const [caracteristicaParaAdicionar, setCaracteristicaParaAdicionar] = useState('');
  
  // Estados para as listas
  const [listaProprietarios, setListaProprietarios] = useState([]);
  const [listaBairros, setListaBairros] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaCaracteristicas, setListaCaracteristicas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NOVOS ESTADOS PARA GERENCIAR IMAGENS ---
  const [imagensExistentes, setImagensExistentes] = useState([]);
  const [arquivosParaUpload, setArquivosParaUpload] = useState([]);

  // Função para buscar todos os dados necessários
  const fetchImovelData = async () => {
    try {
      // Busca os dados das listas primeiro (não precisa estar no try/catch principal)
      const [propRes, bairroRes, catRes, caracRes] = await Promise.all([
          fetch("http://localhost:8080/api/proprietarios"),
          fetch("http://localhost:8080/api/bairros"),
          fetch("http://localhost:8080/api/categorias"),
          fetch("http://localhost:8080/api/caracteristicas")
      ]);
      setListaProprietarios(await propRes.json());
      setListaBairros(await bairroRes.json());
      setListaCategorias(await catRes.json());
      setListaCaracteristicas(await caracRes.json());

      // Busca os dados do imóvel específico
      const imovelRes = await fetch(`http://localhost:8080/api/imoveis/${id}`);
      if (!imovelRes.ok) throw new Error('Imóvel não encontrado');
      const imovel = await imovelRes.json();

      // Preenche os estados do formulário
      const rawValue = String(imovel.valorVenda).replace(/[^0-9.,]/g, '').replace(',', '.');
      setProprietario(imovel.proprietario?.id || '');
      setBairro(imovel.bairro?.id || '');
      setCategoria(imovel.categoria?.id || '');
      setCep(imovel.endereco?.cep || '');
      setRua(imovel.endereco?.rua || '');
      setNumero(imovel.endereco?.numero || '');
      setStatus(imovel.status || '');
      setFinalidade(imovel.tipoFinalidade || '');
      setQuantidadeQuartos(imovel.quantidadeQuartos || '');
      setQuantidadeBanheiros(imovel.quantidadeBanheiros || '');
      setMetragem(imovel.metragem || '');
      setValor(rawValue || '');
      setObservacao(imovel.endereco?.complemento || '');
      setCaracteristicasSelecionadas(imovel.caracteristicas || []);
      setImagensExistentes(imovel.imagens || []);

    } catch (error) {
      console.error("Falha ao carregar dados para edição:", error);
      alert("Não foi possível carregar o imóvel para edição.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchImovelData();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const imovelData = {
      tipoFinalidade: finalidade, valorVenda: parseFloat(valor) || 0, status: status,
      quantidadeQuartos: parseInt(quantidadeQuartos, 10) || 0, quantidadeBanheiros: parseInt(quantidadeBanheiros, 10) || 0,
      metragem: parseFloat(metragem) || 0, endereco: { rua, numero, complemento: observacao, cep },
      proprietario: { id: parseInt(proprietario, 10) }, bairro: { id: parseInt(bairro, 10) },
      categoria: { id: parseInt(categoria, 10) }, caracteristicas: caracteristicasSelecionadas.map(c => ({ id: c.id }))
    };
    try {
      const response = await fetch(`http://localhost:8080/api/imoveis/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(imovelData)
      });
      if (!response.ok) throw new Error('Falha ao atualizar os dados do imóvel.');
      alert('Dados do imóvel atualizados com sucesso!');
    } catch (error) {
      console.error(error); alert(error.message);
    }
  };
  
  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta imagem?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/upload/imagem/${imageId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao excluir a imagem.');
      setImagensExistentes(imagensExistentes.filter(img => img.id !== imageId));
      alert('Imagem excluída com sucesso.');
    } catch (error) {
      console.error(error); alert(error.message);
    }
  };

  const handleUploadNewImages = async () => {
    if (arquivosParaUpload.length === 0) {
      alert("Por favor, selecione novos arquivos para enviar.");
      return;
    }
    const uploadPromises = arquivosParaUpload.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      return fetch(`http://localhost:8080/api/upload/imovel/${id}`, { method: 'POST', body: formData });
    });
    try {
      await Promise.all(uploadPromises);
      alert("Novas imagens enviadas com sucesso!");
      setArquivosParaUpload([]);
      fetchImovelData(); // Recarrega os dados para mostrar as novas imagens
    } catch (error) {
      console.error(error); alert("Ocorreu um erro ao enviar as novas imagens.");
    }
  };

  const handleAdicionarCaracteristica = () => {
    if (!caracteristicaParaAdicionar) return;
    const caracObj = listaCaracteristicas.find(c => c.id.toString() === caracteristicaParaAdicionar);
    if (caracObj && !caracteristicasSelecionadas.some(c => c.id === caracObj.id)) {
      setCaracteristicasSelecionadas([...caracteristicasSelecionadas, caracObj]);
      setCaracteristicaParaAdicionar('');
    }
  };

  const handleRemoverCaracteristica = (id) => setCaracteristicasSelecionadas(caracteristicasSelecionadas.filter(c => c.id !== id));
  const caracteristicasDisponiveis = listaCaracteristicas.filter(c => !caracteristicasSelecionadas.some(s => s.id === c.id));

  if (loading) return <div>Carregando dados para edição...</div>;

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleUpdate} className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h3 className={styles.sectionTitle}>Editando Dados do Imóvel (ID: {id})</h3>
        </div>
        <div className={styles.formGrid}>
          {/* --- JSX COMPLETO DO FORMULÁRIO --- */}
          <div className={styles.formGroup}><label htmlFor="proprietario">Proprietário</label><select id="proprietario" className={styles.selectInput} value={proprietario} onChange={(e) => setProprietario(e.target.value)} required><option value="">Selecione...</option>{listaProprietarios.map(p => (<option key={p.id} value={p.id}>{p.nome}</option>))}</select></div>
          <div className={styles.formGroup}><label htmlFor="bairro">Bairro</label><select id="bairro" className={styles.selectInput} value={bairro} onChange={(e) => setBairro(e.target.value)} required><option value="">Selecione...</option>{listaBairros.map(b => (<option key={b.id} value={b.id}>{b.nome}</option>))}</select></div>
          <div className={styles.formGroup}><label htmlFor="categoria">Categoria</label><select id="categoria" className={styles.selectInput} value={categoria} onChange={(e) => setCategoria(e.target.value)} required><option value="">Selecione...</option>{listaCategorias.map(c => (<option key={c.id} value={c.id}>{c.nome}</option>))}</select></div>
          <div className={styles.formGroup}><label htmlFor="rua">Rua</label><input type="text" id="rua" className={styles.textInput} value={rua} onChange={(e) => setRua(e.target.value)} /></div>
          <div className={styles.formGroup}><label htmlFor="numero">Número</label><input type="text" id="numero" className={styles.textInput} value={numero} onChange={(e) => setNumero(e.target.value)}/></div>
          <div className={styles.formGroup}><label htmlFor="cep">CEP</label><input type="text" id="cep" className={styles.textInput} value={cep} onChange={(e) => setCep(e.target.value)} /></div>
          <div className={styles.formGroup}><label htmlFor="finalidade">Finalidade</label><select id="finalidade" className={styles.selectInput} value={finalidade} onChange={(e) => setFinalidade(e.target.value)} ><option value="Vender">Vender</option><option value="Alugar">Alugar</option></select></div>
          <div className={styles.formGroup}><label htmlFor="status">Status</label><select id="status" className={styles.selectInput} value={status} onChange={(e) => setStatus(e.target.value)} required><option value="">Selecione</option><option value="Disponível">Disponível</option><option value="Vendido">Vendido</option><option value="Alugado">Alugado</option></select></div>
          <div className={styles.formGroup}><label htmlFor="valor">Valor (R$)</label><input type="number" step="0.01" id="valor" className={styles.textInput} value={valor} onChange={(e) => setValor(e.target.value)} /></div>
          <div className={styles.formGroup}><label htmlFor="quantidadeQuartos">Nº Quartos</label><input type="number" id="quantidadeQuartos" className={styles.textInput} value={quantidadeQuartos} onChange={(e) => setQuantidadeQuartos(e.target.value)} min="0" /></div>
          <div className={styles.formGroup}><label htmlFor="quantidadeBanheiros">Nº Banheiros</label><input type="number" id="quantidadeBanheiros" className={styles.textInput} value={quantidadeBanheiros} onChange={(e) => setQuantidadeBanheiros(e.target.value)} min="0" /></div>
          <div className={styles.formGroup}><label htmlFor="metragem">Metros²</label><input type="number" step="0.01" id="metragem" className={styles.textInput} value={metragem} onChange={(e) => setMetragem(e.target.value)} /></div>
          <div className={styles.formGroupFullWidth}><label htmlFor="observacao">Complemento / Observação</label><textarea id="observacao" className={styles.textArea} value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="3"></textarea></div>
          <div className={`${styles.formGroupFullWidth} ${styles.characteristicsSection}`}><label htmlFor="caracteristica-select">Características</label><div className={styles.addCharacteristicWrapper}><select id="caracteristica-select" className={styles.selectInput} value={caracteristicaParaAdicionar} onChange={(e) => setCaracteristicaParaAdicionar(e.target.value)}><option value="">Selecione para adicionar...</option>{caracteristicasDisponiveis.map(c => (<option key={c.id} value={c.id}>{c.nome}</option>))}</select><button type="button" className={`${styles.button} ${styles.addBtn}`} onClick={handleAdicionarCaracteristica}>Adicionar</button></div><div className={styles.selectedCharacteristics}>{caracteristicasSelecionadas.map(c => (<div key={c.id} className={styles.characteristicTag}><span>{c.nome}</span><button type="button" className={styles.tagRemoverBtn} onClick={() => handleRemoverCaracteristica(c.id)}>X</button></div>))}</div></div>
        </div>
        <div className={`${styles.formGroup} ${styles.formActions}`}>
          <button type="button" className={`${styles.button} ${styles.clearButton}`} onClick={() => navigate('/gerenciamento/imoveis')}>Cancelar</button>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Salvar Alterações nos Dados</button>
        </div>
      </form>

      {/* --- Seção de Gerenciamento de Imagens --- */}
      <div className={styles.imageManagementSection}>
        <div className={styles.formHeader}><h3 className={styles.sectionTitle}>Gerenciar Imagens</h3></div>
        <h4>Imagens Atuais</h4>
        <div className={styles.gallery}>
          {imagensExistentes.length > 0 ? imagensExistentes.map(img => (
            <div key={img.id} className={styles.galleryItem}>
              <img src={`http://localhost:8080/${img.caminho.replace(/\\/g, '/')}`} alt={`Imagem ${img.id}`} />
              <button onClick={() => handleDeleteImage(img.id)} className={styles.deleteImageButton}>Excluir</button>
            </div>
          )) : <p>Nenhuma imagem cadastrada para este imóvel.</p>}
        </div>
        <h4 style={{marginTop: '2rem'}}>Adicionar Novas Imagens</h4>
        <div className={styles.uploadSection}>
            <input type="file" multiple accept="image/*" onChange={(e) => setArquivosParaUpload(Array.from(e.target.files))} className={styles.fileInput} />
            <button onClick={handleUploadNewImages} className={`${styles.button} ${styles.submitButton}`} disabled={arquivosParaUpload.length === 0}>
              Enviar Novas Imagens
            </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyEditPage;
