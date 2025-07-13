import React, { useState } from 'react';
import styles from './PropertyRegistrationForm.module.css';

const PropertyRegistrationForm = () => {
  const [codigo, setCodigo] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [rua, setRua] = useState('');
  const [finalidade, setFinalidade] = useState('Alugar');
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [observacao, setObservacao] = useState('');
  const [quantidadeQuartos, setQuantidadeQuartos] = useState('');
  const [quantidadeBanheiros, setQuantidadeBanheiros] = useState('');
  const [metragem, setMetragem] = useState('');
  const [valor, setValor] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  const [caracteristicas, setCaracteristicas] = useState({
    salaoFesta: false,
    piscina: false,
    banheira: false,
    lareira: false,
    churrasqueira: false,
    playground: false,
    academia: false,
    portaria24h: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (parseInt(quantidadeQuartos) < 0) {
      alert('Número de quartos não pode ser negativo.');
      return;
    }
    if (parseInt(quantidadeBanheiros) < 0) {
      alert('Número de banheiros não pode ser negativo.');
      return;
    }
    if (!valor.trim()) {
      alert('O campo "Valor" é obrigatório.');
      return;
    }
    if (!imagemUrl.trim()) {
      alert('O campo "URL da Imagem" é obrigatório.');
      return;
    }

    const newImovelData = {
      codigo, proprietario, cep, cidade, bairro, numero, rua,
      finalidade, categoria, titulo, observacao,
      quantidadeQuartos, quantidadeBanheiros, metragem, valor,
      image: imagemUrl,
      caracteristicas, 
    };
    console.log('Dados do Imóvel para Cadastro:', newImovelData);
    alert('Imóvel cadastrado com sucesso (dados no console)!');
  };

  const handleClear = () => {
    setCodigo(''); setProprietario(''); setCep(''); setCidade(''); setBairro('');
    setNumero(''); setRua(''); setFinalidade('Alugar'); setCategoria('');
    setTitulo(''); setObservacao('');
    setQuantidadeQuartos(''); setQuantidadeBanheiros(''); setMetragem('');
    setValor('');
    setImagemUrl('');
    setCaracteristicas({
      salaoFesta: false, piscina: false, banheira: false, lareira: false,
      churrasqueira: false, playground: false, academia: false, portaria24h: false,
    });
  };

  const handleSearchCodigo = () => {
    console.log('Buscando imóvel com código:', codigo);
    alert(`Funcionalidade de busca por código ${codigo} em desenvolvimento!`);
  };

  const handleCaracteristicaChange = (event) => {
    const { name, checked } = event.target;
    setCaracteristicas(prevCaracteristicas => ({
      ...prevCaracteristicas,
      [name]: checked
    }));
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h3 className={styles.sectionTitle}>Cadastro Imóvel</h3>
      </div>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroupFullWidth}> 
            <h4 className={styles.subSectionTitle}>Informações Básicas</h4>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="codigo">Código</label>
          <div className={styles.inputWithButton}>
            <input type="text" id="codigo" className={`${styles.textInput} ${styles.inputShort}`} value={codigo} onChange={(e) => setCodigo(e.target.value)}required />
            <button type="button" className={styles.searchIconButton} onClick={handleSearchCodigo}>
              🔍
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="proprietario">Proprietário</label>
          <input type="text" id="proprietario" className={styles.textInput} value={proprietario} onChange={(e) => setProprietario(e.target.value)}required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cep">Cep</label>
          <input type="text" id="cep" className={styles.textInput} value={cep} onChange={(e) => setCep(e.target.value)}required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bairro">Bairro</label>
          <input type="text" id="bairro" className={styles.textInput} value={bairro} onChange={(e) => setBairro(e.target.value)} required/>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="rua">Rua</label>
          <input type="text" id="rua" className={styles.textInput} value={rua} onChange={(e) => setRua(e.target.value)}required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="numero">Número</label>
          <input type="text" id="numero" className={styles.textInput} value={numero} onChange={(e) => setNumero(e.target.value)}required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cidade">Cidade</label>
          <input type="text" id="cidade" className={styles.textInput} value={cidade} onChange={(e) => setCidade(e.target.value)}required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="finalidade">Finalidade</label>
          <select id="finalidade" className={styles.selectInput} value={finalidade} onChange={(e) => setFinalidade(e.target.value)} required>
            <option value="Alugar">Alugar</option>
            <option value="Vender">Vender</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria" className={styles.selectInput} value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            <option value="">Selecione</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
          </select>
        </div>


        <div className={styles.formGroup}>
          <label htmlFor="titulo">Título</label>
          <input type="text" id="titulo" className={styles.textInput} value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
        </div>

        <div className={styles.formGroupFullWidth}>
            <h4 className={styles.subSectionTitle}>Detalhes e Características</h4>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantidadeQuartos">Nº Quartos</label>
          <input type="number" id="quantidadeQuartos" className={styles.textInput} value={quantidadeQuartos} onChange={(e) => setQuantidadeQuartos(e.target.value)} min="0" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantidadeBanheiros">Nº Banheiros</label>
          <input type="number" id="quantidadeBanheiros" className={styles.textInput} value={quantidadeBanheiros} onChange={(e) => setQuantidadeBanheiros(e.target.value)} min="0" required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="metragem">Metros Quadrados</label>
          <input type="text" id="metragem" className={styles.textInput} value={metragem} onChange={(e) => setMetragem(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="valor">Valor</label>
          <input type="text" id="valor" className={styles.textInput} value={valor} onChange={(e) => setValor(e.target.value)} required />
        </div>
        
        <div className={styles.formGroup}> 
          <label htmlFor="observacao">Observação</label>
          <textarea id="observacao" className={styles.textArea} value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="3"></textarea>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imagemUrl">URL da Imagem:</label>
          <input
            type="text"
            id="imagemUrl"
            className={styles.textInput}
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            placeholder="Cole a URL da imagem"
            required
          />
        </div>

        <div className={`${styles.formGroup} ${styles.formGroupFullWidth} ${styles.characteristicsSection}`}> 
          <label className={styles.characteristicsLabel}>Características:</label>
          <div className={styles.characteristicsGrid}>
            {Object.keys(caracteristicas).map(key => (
              <label key={key} className={styles.checkboxOption}>
                <input
                  type="checkbox"
                  name={key}
                  checked={caracteristicas[key]}
                  onChange={handleCaracteristicaChange}
                  className={styles.checkboxInput}
                />
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            ))}
          </div>
        </div>

        <div className={`${styles.formGroup} ${styles.formActions}`}>
          <button type="button" className={`${styles.button} ${styles.deleteButton}`}>
            Deletar
          </button>
          <button type="button" className={`${styles.button} ${styles.clearButton}`} onClick={handleClear}>
            Limpar
          </button>
          <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

export default PropertyRegistrationForm;