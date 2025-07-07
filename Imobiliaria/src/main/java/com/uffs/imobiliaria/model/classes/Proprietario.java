package com.uffs.imobiliaria.model.classes;
import jakarta.persistence.*;



@Entity
@Table(name = "Proprietários")


public class Proprietario {

// Atributos obrigatórios:

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY) // Faz com que o ID seja a PK (Primary Key).
private Long  id;

@Column(unique = true , nullable = false) // Faz com que CPF seja unico e nao permite que seja nulo.
private String cpf;

@Column(nullable = false)  // Faz com que o nome não possa ser nulo.
private String nome;

private String nacionalidade;
private String rg;
private String orgaoExpedidor;
private String dataExpedicaoRg;
private String naturalidade;
private String nomePai;
private String nomeMae;
private String dataNascimento;
private String sexo;
private String estadoCivil;

@Embedded
private Endereco endereco;

// Atributos não-obrigatórios:

private String observacao;
private String email;
private String telefone;

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getOrgaoExpedidor() {
        return orgaoExpedidor;
    }

    public void setOrgaoExpedidor(String orgaoExpedidor) {
        this.orgaoExpedidor = orgaoExpedidor;
    }

    public String getDataExpedicaoRg() {
        return dataExpedicaoRg;
    }

    public void setDataExpedicaoRg(String dataExpedicaoRg) {
        this.dataExpedicaoRg = dataExpedicaoRg;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

    public String getNomePai() {
        return nomePai;
    }

    public void setNomePai(String nomePai) {
        this.nomePai = nomePai;
    }

    public String getNomeMae() {
        return nomeMae;
    }

    public void setNomeMae(String nomeMae) {
        this.nomeMae = nomeMae;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }


    public Proprietario() {
    }


    public Proprietario(Long id, String cpf, String nome, String nacionalidade, String rg, String orgaoExpedidor, String dataExpedicaoRg, String naturalidade, String nomePai, String nomeMae, String dataNascimento, String sexo, String estadoCivil) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.nacionalidade = nacionalidade;
        this.rg = rg;
        this.orgaoExpedidor = orgaoExpedidor;
        this.dataExpedicaoRg = dataExpedicaoRg;
        this.naturalidade = naturalidade;
        this.nomePai = nomePai;
        this.nomeMae = nomeMae;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.estadoCivil = estadoCivil;
    }
}
