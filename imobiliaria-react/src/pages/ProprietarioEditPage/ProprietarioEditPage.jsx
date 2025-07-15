import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../components/ProprietarioRegistrationForm/ProprietarioRegistrationForm.module.css'; // Reutilizando o estilo

const ProprietarioEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialState = {
    cpf: '', nome: '', nacionalidade: '', rg: '', orgaoExpedidor: '',
    dataExpedicaoRg: '', naturalidade: '', nomePai: '', nomeMae: '',
    dataNascimento: '', sexo: '', estadoCivil: '', observacao: '',
    email: '', telefone: '',
    endereco: {
      cep: '', rua: '', numero: '', complemento: '',
      bairro: { id: '' }, cidade: '', estado: ''
    }
  };

  const [formData, setFormData] = useState(initialState);
  const [listaBairros, setListaBairros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imoveisDoProprietario, setImoveisDoProprietario] = useState([]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Busca os dados do proprietário, a lista de bairros e os imóveis associados
      const [proprietarioRes, bairrosRes, imoveisRes] = await Promise.all([
        fetch(`http://localhost:8080/api/proprietarios/${id}`),
        fetch("http://localhost:8080/api/bairros"),
        fetch(`http://localhost:8080/api/imoveis/por-proprietario/${id}`)
      ]);

      if (!proprietarioRes.ok) throw new Error('Proprietário não encontrado');
      
      const proprietarioData = await proprietarioRes.json();
      const bairrosData = await bairrosRes.json();
      
      setListaBairros(bairrosData);

      if (imoveisRes.ok) {
          setImoveisDoProprietario(await imoveisRes.json());
      }

      // Formata e preenche os dados do formulário
      proprietarioData.dataNascimento = proprietarioData.dataNascimento ? proprietarioData.dataNascimento.split('T')[0] : '';
      proprietarioData.dataExpedicaoRg = proprietarioData.dataExpedicaoRg ? proprietarioData.dataExpedicaoRg.split('T')[0] : '';
      
      setFormData({
        ...initialState,
        ...proprietarioData,
        endereco: {
          ...initialState.endereco,
          ...(proprietarioData.endereco || {}),
        },
      });

    } catch (error) {
      console.error("Falha ao carregar dados:", error);
      alert("Não foi possível carregar os dados para edição.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [id]);

  const handleDeleteImovel = async (imovelId) => {
    if (!window.confirm(`Tem certeza que deseja excluir o imóvel com ID: ${imovelId}?`)) return;
    try {
      const response = await fetch(`http://localhost:8080/api/imoveis/${imovelId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Falha ao excluir o imóvel.');
      
      // Remove o imóvel da lista na tela
      setImoveisDoProprietario(imoveisDoProprietario.filter(imovel => imovel.id !== imovelId));
      alert('Imóvel excluído com sucesso!');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/proprietarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Falha ao atualizar o proprietário.');
      alert('Proprietário atualizado com sucesso!');
      navigate('/gerenciamento/proprietarios');
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, endereco: { ...prev.endereco, [name]: value } }));
  };
  
  const handleBairroChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, endereco: { ...prev.endereco, bairro: { id: value } } }));
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className={styles.pageContainer}>
      <form className={styles.formContainer} onSubmit={handleUpdate}>
        <div className={styles.formHeader}>
          <h3 className={styles.sectionTitle}>Editando Proprietário (ID: {id})</h3>
        </div>
        <div className={styles.formGrid}>
            {/* Campos Pessoais */}
            <div className={styles.formGroup}><label>CPF</label><input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Nome</label><input type="text" name="nome" value={formData.nome} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.textInput} /></div>
            <div className={styles.formGroup}><label>Telefone</label><input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className={styles.textInput} /></div>
            <div className={styles.formGroup}><label>Data de Nascimento</label><input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Sexo</label><select name="sexo" value={formData.sexo} onChange={handleChange} className={styles.selectInput}><option value="">Selecione</option><option value="MASCULINO">Masculino</option><option value="FEMININO">Feminino</option><option value="OUTRO">Outro</option></select></div>
            <div className={styles.formGroup}><label>Estado Civil</label><select name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} className={styles.selectInput}><option value="">Selecione</option><option value="SOLTEIRO">Solteiro(a)</option><option value="CASADO">Casado(a)</option><option value="DIVORCIADO">Divorciado(a)</option><option value="VIUVO">Viúvo(a)</option></select></div>
            <div className={styles.formGroup}><label>Nacionalidade</label><input type="text" name="nacionalidade" value={formData.nacionalidade} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Naturalidade</label><input type="text" name="naturalidade" value={formData.naturalidade} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>RG</label><input type="text" name="rg" value={formData.rg} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Órgão Expedidor</label><input type="text" name="orgaoExpedidor" value={formData.orgaoExpedidor} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Data de Expedição</label><input type="date" name="dataExpedicaoRg" value={formData.dataExpedicaoRg} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Nome da Mãe</label><input type="text" name="nomeMae" value={formData.nomeMae} onChange={handleChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Nome do Pai</label><input type="text" name="nomePai" value={formData.nomePai} onChange={handleChange} className={styles.textInput} required /></div>
            
            {/* Endereço */}
            <div className={styles.formGroupFullWidth}><h4 className={styles.subSectionTitle}>Endereço</h4></div>
            <div className={styles.formGroup}><label>CEP</label><input type="text" name="cep" value={formData.endereco?.cep || ''} onChange={handleEnderecoChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Rua</label><input type="text" name="rua" value={formData.endereco?.rua || ''} onChange={handleEnderecoChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Número</label><input type="text" name="numero" value={formData.endereco?.numero || ''} onChange={handleEnderecoChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Complemento</label><input type="text" name="complemento" value={formData.endereco?.complemento || ''} onChange={handleEnderecoChange} className={styles.textInput} /></div>
            <div className={styles.formGroup}><label>Bairro</label><select name="bairro" value={formData.endereco?.bairro?.id || ''} onChange={handleBairroChange} className={styles.selectInput} required><option value="">Selecione...</option>{listaBairros.map(b => (<option key={b.id} value={b.id}>{b.nome}</option>))}</select></div>
            <div className={styles.formGroup}><label>Cidade</label><input type="text" name="cidade" value={formData.endereco?.cidade || ''} onChange={handleEnderecoChange} className={styles.textInput} required /></div>
            <div className={styles.formGroup}><label>Estado</label><input type="text" name="estado" value={formData.endereco?.estado || ''} onChange={handleEnderecoChange} className={styles.textInput} required /></div>

            <div className={styles.formGroupFullWidth}><label>Observação</label><textarea name="observacao" value={formData.observacao} onChange={handleChange} className={styles.textArea} rows="3"></textarea></div>
        </div>
        <div className={styles.formActions}>
            <button type="button" className={`${styles.button} ${styles.clearButton}`} onClick={() => navigate('/gerenciamento/proprietarios')}>Cancelar</button>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Salvar Alterações</button>
        </div>
      </form>

      {/* --- NOVA SEÇÃO: IMÓVEIS ASSOCIADOS --- */}
      <div className={`${styles.formContainer} ${styles.relatedPropertiesSection}`}>
        <div className={styles.formHeader}>
          <h3 className={styles.sectionTitle}>Imóveis Associados a este Proprietário</h3>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.relatedTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Endereço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveisDoProprietario.length > 0 ? (
                imoveisDoProprietario.map(imovel => (
                  <tr key={imovel.id}>
                    <td>{imovel.id}</td>
                    <td>{`${imovel.endereco?.rua || ''}, ${imovel.endereco?.numero || ''}`}</td>
                    <td>{imovel.status}</td>
                    <td className={styles.actionsCell}>
                      <button onClick={() => handleDeleteImovel(imovel.id)} className={`${styles.button} ${styles.deleteButton}`}>
                        Excluir Imóvel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.noResults}>Nenhum imóvel associado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProprietarioEditPage;
