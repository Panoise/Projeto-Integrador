import React, { useState, useEffect } from 'react';
import styles from './PropertyRegistrationForm.module.css';

const PropertyRegistrationForm = () => {
  // Estados para os valores dos campos
  const [proprietario, setProprietario] = useState('');
  const [bairro, setBairro] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [status, setStatus] = useState('');
  const [finalidade, setFinalidade] = useState('Vender');
  const [quantidadeQuartos, setQuantidadeQuartos] = useState('');
  const [quantidadeBanheiros, setQuantidadeBanheiros] = useState('');
  const [metragem, setMetragem] = useState('');
  const [valor, setValor] = useState('');
  const [observacao, setObservacao] = useState('');

  // Estados para as listas vindas da API
  const [listaProprietarios, setListaProprietarios] = useState([]);
  const [listaBairros, setListaBairros] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaCaracteristicas, setListaCaracteristicas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para a lógica de características dinâmicas
  const [caracteristicasSelecionadas, setCaracteristicasSelecionadas] = useState([]);
  const [caracteristicaParaAdicionar, setCaracteristicaParaAdicionar] = useState('');

  // --- NOVOS ESTADOS PARA O FLUXO DE UPLOAD ---
  const [novoImovelId, setNovoImovelId] = useState(null); // Armazena o ID do imóvel após ser criado
  const [arquivosParaUpload, setArquivosParaUpload] = useState([]); // Armazena os arquivos selecionados pelo usuário

  useEffect(() => {
    // (Lógica para buscar dados das listas - proprietarios, bairros, etc. - permanece a mesma)
    const fetchData = async () => {
        try {
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
        } catch (error) {
            console.error("Falha ao buscar dados para o formulário:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  // --- LÓGICA DE ENVIO EM 2 ETAPAS ---
  const handleSubmitDadosImovel = async (event) => {
    event.preventDefault();

    if (!proprietario || !bairro || !categoria || !status) {
        alert('Os campos Proprietário, Bairro, Categoria e Status são obrigatórios.');
        return;
    }

    const imovelData = {
      tipoFinalidade: finalidade, 
      valorVenda: parseFloat(valor) || 0, 
      status: status,
      quantidadeQuartos: parseInt(quantidadeQuartos, 10) || 0, 
      quantidadeBanheiros: parseInt(quantidadeBanheiros, 10) || 0,
      metragem: parseFloat(metragem) || 0, 
      endereco: { rua, numero, complemento: observacao, cep },
      proprietario: { id: parseInt(proprietario, 10) }, 
      bairro: { id: parseInt(bairro, 10) },
      categoria: { id: parseInt(categoria, 10) }, 
      caracteristicas: caracteristicasSelecionadas.map(c => ({ id: c.id }))
    };

    try {
      const response = await fetch("http://localhost:8080/api/imoveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imovelData)
      });
      if (!response.ok) throw new Error(`Erro ao salvar imóvel: ${await response.text()}`);
      
      const imovelSalvo = await response.json();
      setNovoImovelId(imovelSalvo.id); // <-- PONTO CHAVE: Salva o ID do novo imóvel
      alert(`Imóvel cadastrado com ID: ${imovelSalvo.id}. Agora, envie as imagens.`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const handleSelecaoDeArquivos = (event) => {
    const novosArquivos = Array.from(event.target.files);
    setArquivosParaUpload(prevArquivos => [...prevArquivos, ...novosArquivos]);
  };

  const handleRemoverArquivo = (nomeDoArquivo) => {
    setArquivosParaUpload(prevArquivos => prevArquivos.filter(arquivo => arquivo.name !== nomeDoArquivo));
  };

  const handleUploadDeImagens = async () => {
    if (arquivosParaUpload.length === 0) {
        alert("Por favor, selecione pelo menos um arquivo.");
        return;
    }

    const uploadPromises = arquivosParaUpload.map(file => {
        const formData = new FormData();
        formData.append("file", file);

        return fetch(`http://localhost:8080/api/upload/imovel/${novoImovelId}`, {
            method: 'POST',
            body: formData,
        });
    });

    try {
        await Promise.all(uploadPromises);
        alert("Upload de todas as imagens concluído com sucesso!");
        handleClear(); // Limpa todo o formulário para um novo cadastro
    } catch (error) {
        console.error("Ocorreu um erro durante o upload:", error);
        alert("Ocorreu um erro ao enviar uma ou mais imagens.");
    }
  };


  const handleClear = () => {
    setProprietario(''); setBairro(''); setCategoria(''); setCep(''); setRua(''); setNumero('');
    setStatus(''); setFinalidade('Vender'); setQuantidadeQuartos(''); setQuantidadeBanheiros('');
    setMetragem(''); setValor(''); setObservacao('');
    setCaracteristicasSelecionadas([]); setCaracteristicaParaAdicionar('');
    setNovoImovelId(null); // <-- Limpa o ID para permitir novo cadastro
    setArquivosParaUpload([]);
  };

  // Funções de adicionar/remover característica permanecem as mesmas
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

  if (loading) return <div>Carregando...</div>;

  return (
    // O formulário agora é dividido em duas partes, controladas pelo estado 'novoImovelId'
    <div className={styles.formContainer}>
        <form onSubmit={handleSubmitDadosImovel} style={{ display: novoImovelId ? 'none' : 'block' }}>
            <div className={styles.formHeader}>
                <h3 className={styles.sectionTitle}>Passo 1: Dados do Imóvel</h3>
            </div>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="proprietario">Proprietário</label>
                    <select id="proprietario" className={styles.selectInput} value={proprietario} onChange={(e) => setProprietario(e.target.value)} required>
                        <option value="">Selecione...</option>
                        {listaProprietarios.map(p => (<option key={p.id} value={p.id}>{p.nome}</option>))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="bairro">Bairro</label>
                    <select id="bairro" className={styles.selectInput} value={bairro} onChange={(e) => setBairro(e.target.value)} required>
                         <option value="">Selecione...</option>
                        {listaBairros.map(b => (<option key={b.id} value={b.id}>{b.nome}</option>))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" className={styles.selectInput} value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                         <option value="">Selecione...</option>
                        {listaCategorias.map(c => (<option key={c.id} value={c.id}>{c.nome}</option>))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="rua">Rua</label>
                    <input type="text" id="rua" className={styles.textInput} value={rua} onChange={(e) => setRua(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="numero">Número</label>
                    <input type="text" id="numero" className={styles.textInput} value={numero} onChange={(e) => setNumero(e.target.value)}/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cep">CEP</label>
                    <input type="text" id="cep" className={styles.textInput} value={cep} onChange={(e) => setCep(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="finalidade">Finalidade</label>
                    <select id="finalidade" className={styles.selectInput} value={finalidade} onChange={(e) => setFinalidade(e.target.value)} >
                        <option value="Vender">Vender</option>
                        <option value="Alugar">Alugar</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select id="status" className={styles.selectInput} value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="Disponível">Disponível</option>
                        <option value="Vendido">Vendido</option>
                        <option value="Alugado">Alugado</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="valor">Valor (R$)</label>
                    <input type="number" step="0.01" id="valor" className={styles.textInput} value={valor} onChange={(e) => setValor(e.target.value)} />
                </div>
                 <div className={styles.formGroup}>
                    <label htmlFor="quantidadeQuartos">Nº Quartos</label>
                    <input type="number" id="quantidadeQuartos" className={styles.textInput} value={quantidadeQuartos} onChange={(e) => setQuantidadeQuartos(e.target.value)} min="0" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="quantidadeBanheiros">Nº Banheiros</label>
                    <input type="number" id="quantidadeBanheiros" className={styles.textInput} value={quantidadeBanheiros} onChange={(e) => setQuantidadeBanheiros(e.target.value)} min="0" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="metragem">Metros²</label>
                    <input type="number" step="0.01" id="metragem" className={styles.textInput} value={metragem} onChange={(e) => setMetragem(e.target.value)} />
                </div>
                <div className={styles.formGroupFullWidth}> 
                    <label htmlFor="observacao">Complemento / Observação</label>
                    <textarea id="observacao" className={styles.textArea} value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="3"></textarea>
                </div>
                <div className={`${styles.formGroupFullWidth} ${styles.characteristicsSection}`}>
                    <label htmlFor="caracteristica-select">Características</label>
                    <div className={styles.addCharacteristicWrapper}>
                        <select id="caracteristica-select" className={styles.selectInput} value={caracteristicaParaAdicionar} onChange={(e) => setCaracteristicaParaAdicionar(e.target.value)}>
                            <option value="">Selecione para adicionar...</option>
                            {caracteristicasDisponiveis.map(c => (<option key={c.id} value={c.id}>{c.nome}</option>))}
                        </select>
                        <button type="button" className={`${styles.button} ${styles.addBtn}`} onClick={handleAdicionarCaracteristica}>Adicionar</button>
                    </div>
                    <div className={styles.selectedCharacteristics}>
                        {caracteristicasSelecionadas.map(c => (
                            <div key={c.id} className={styles.characteristicTag}>
                                <span>{c.nome}</span>
                                <button type="button" className={styles.tagRemoverBtn} onClick={() => handleRemoverCaracteristica(c.id)}>X</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={`${styles.formGroup} ${styles.formActions}`}>
                <button type="button" className={`${styles.button} ${styles.clearButton}`} onClick={handleClear}>Limpar</button>
                <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Salvar e Ir para Imagens</button>
            </div>
        </form>

        <div style={{ display: novoImovelId ? 'block' : 'none' }}>
            <div className={styles.formHeader}>
                <h3 className={styles.sectionTitle}>Passo 2: Imagens do Imóvel (ID: {novoImovelId})</h3>
            </div>
            <div className={styles.uploadSection}>
                <p>Selecione uma ou mais imagens para o seu anúncio.</p>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleSelecaoDeArquivos}
                />
                <div className={styles.previewContainer}>
                    {arquivosParaUpload.map((arquivo, index) => (
                        <div key={index} className={styles.previewItem}>
                            <span>{arquivo.name}</span>
                            <button onClick={() => handleRemoverArquivo(arquivo.name)} className={styles.removeFileButton}>X</button>
                        </div>
                    ))}
                </div>
                 <div className={styles.formActions}>
                    <button type="button" className={`${styles.button} ${styles.clearButton}`} onClick={handleClear}>Cancelar</button>
                    <button type="button" className={`${styles.button} ${styles.submitButton}`} onClick={handleUploadDeImagens}>
                        Enviar {arquivosParaUpload.length} Imagens
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PropertyRegistrationForm;
