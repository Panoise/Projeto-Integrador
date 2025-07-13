import React, { useState } from 'react';
import styles from './ProprietarioRegistrationForm.module.css';

const ProprietarioRegistrationForm = () => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState(''); 

  const [nacionalidade, setNacionalidade] = useState('');
  const [rg, setRg] = useState('');
  const [orgaoExpedidor, setOrgaoExpedidor] = useState('');
  const [dataExpedicaoRg, setDataExpedicaoRg] = useState('');
  const [naturalidade, setNaturalidade] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');

  const [observacao, setObservacao] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();


    const newProprietarioData = {
      cpf, nome, nacionalidade, rg, orgaoExpedidor, dataExpedicaoRg,
      naturalidade, nomePai, nomeMae, dataNascimento, sexo, estadoCivil,
      endereco: { cep, rua, numero, complemento, bairro, cidade, estado },
      observacao, email, telefone
    };

    console.log('Dados do Proprietário para Cadastro:', newProprietarioData);
    alert('Proprietário cadastrado com sucesso (dados no console)!');

  };

  const handleClear = () => {
    setCpf(''); setNome(''); setNacionalidade(''); setRg(''); setOrgaoExpedidor('');
    setDataExpedicaoRg(''); setNaturalidade(''); setNomePai(''); setNomeMae('');
    setDataNascimento(''); setSexo(''); setEstadoCivil('');
    setCep(''); setRua(''); setNumero(''); setComplemento(''); setBairro('');
    setCidade(''); setEstado('');
    setObservacao(''); setEmail(''); setTelefone('');
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h3 className={styles.sectionTitle}>Cadastro Proprietário</h3>
      </div>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" className={styles.textInput} value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" className={styles.textInput} value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nacionalidade">Nacionalidade</label>
          <input type="text" id="nacionalidade" className={styles.textInput} value={nacionalidade} onChange={(e) => setNacionalidade(e.target.value)}required />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="rg">RG</label>
          <input type="text" id="rg" className={styles.textInput} value={rg} onChange={(e) => setRg(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="orgaoExpedidor">Órgão Expedidor</label>
          <input type="text" id="orgaoExpedidor" className={styles.textInput} value={orgaoExpedidor} onChange={(e) => setOrgaoExpedidor(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dataExpedicaoRg">Data Expedição RG</label>
          <input type="date" id="dataExpedicaoRg" className={styles.textInput} value={dataExpedicaoRg} onChange={(e) => setDataExpedicaoRg(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="naturalidade">Naturalidade</label>
          <input type="text" id="naturalidade" className={styles.textInput} value={naturalidade} onChange={(e) => setNaturalidade(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nomePai">Nome Pai</label>
          <input type="text" id="nomePai" className={styles.textInput} value={nomePai} onChange={(e) => setNomePai(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nomeMae">Nome Mãe</label>
          <input type="text" id="nomeMae" className={styles.textInput} value={nomeMae} onChange={(e) => setNomeMae(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dataNascimento">Data Nascimento</label>
          <input type="date" id="dataNascimento" className={styles.textInput} value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required/>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sexo">Sexo</label>
          <select id="sexo" className={styles.selectInput} value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="">Selecione</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="estadoCivil">Estado Civil</label>
          <select id="estadoCivil" className={styles.selectInput} value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)}>
            <option value="">Selecione</option>
            <option value="SOLTEIRO">Solteiro(a)</option>
            <option value="CASADO">Casado(a)</option>
            <option value="DIVORCIADO">Divorciado(a)</option>
            <option value="VIUVO">Viúvo(a)</option>
          </select>
        </div>
        
        <div className={styles.formGroupFullWidth}>
            <h4 className={styles.subSectionTitle}>Endereço</h4>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cepEndereco">CEP</label>
          <input type="text" id="cepEndereco" className={styles.textInput} value={cep} onChange={(e) => setCep(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="ruaEndereco">Rua</label>
          <input type="text" id="ruaEndereco" className={styles.textInput} value={rua} onChange={(e) => setRua(e.target.value)}required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="numeroEndereco">Número</label>
          <input type="text" id="numeroEndereco" className={styles.textInput} value={numero} onChange={(e) => setNumero(e.target.value)} required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="complementoEndereco">Complemento</label>
          <input type="text" id="complementoEndereco" className={styles.textInput} value={complemento} onChange={(e) => setComplemento(e.target.value)}required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bairroEndereco">Bairro</label>
          <input type="text" id="bairroEndereco" className={styles.textInput} value={bairro} onChange={(e) => setBairro(e.target.value)} required/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cidadeEndereco">Cidade</label>
          <input type="text" id="cidadeEndereco" className={styles.textInput} value={cidade} onChange={(e) => setCidade(e.target.value)}required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="estadoEndereco">Estado</label>
          <input type="text" id="estadoEndereco" className={styles.textInput} value={estado} onChange={(e) => setEstado(e.target.value)}required />
        </div>

        <div className={styles.formGroupFullWidth}> 
            <h4 className={styles.subSectionTitle}>Contato</h4>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="observacao">Observação</label>
          <textarea id="observacao" className={styles.textArea} value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="3"></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className={styles.textInput} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="telefone">Telefone</label>
          <input type="tel" id="telefone" className={styles.textInput} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>

        <div className={styles.formActions}>
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

export default ProprietarioRegistrationForm;