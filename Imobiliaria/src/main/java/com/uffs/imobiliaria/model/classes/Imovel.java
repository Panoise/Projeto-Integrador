package com.uffs.imobiliaria.model.classes;

import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "imovel")
public class Imovel {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoFinalidade;
    private String valorVenda;
    private String status;
    private Integer quantidadeQuartos;
    private Integer quantidadeBanheiros;
    private Double metragem;


    @Embedded
    private Endereco endereco;



    // Construtor vazio para o JPA
    public Imovel() {
    }

    // Relacionamentos com outras entidades:

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietario_id")
    private Proprietario proprietario;


    //Muitas imagens para um imóvel.
    @OneToMany(mappedBy = "imovel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagem> imagens = new ArrayList<>();


    @ManyToOne // Muitos imóveis para UMA categoria
    @JoinColumn(name = "categoria_id") // Chave estrangeira na tabela de imóveis
    private Categoria categoria;

    @ManyToOne // Muitos imóveis para UM bairro
    @JoinColumn(name = "bairro_id") // Chave estrangeira na tabela de imóveis
    private Bairro bairro;

    @ManyToMany // Muitos imóveis para MUITAS características
    @JoinTable(
            name = "imovel_caracteristica", // Nome da tabela de ligação
            joinColumns = @JoinColumn(name = "imovel_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id")
    )
    private Set<Caracteristica> caracteristicas = new HashSet<>();


    //Opção para exibir no site ou não
    @Column(name = "exibir_no_site", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean exibirNoSite = false;


    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoFinalidade() {
        return tipoFinalidade;
    }

    public void setTipoFinalidade(String tipoFinalidade) {
        this.tipoFinalidade = tipoFinalidade;
    }

    public String getValorVenda() {
        return valorVenda;
    }

    public void setValorVenda(String valorVenda) {
        this.valorVenda = valorVenda;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getQuantidadeQuartos() {
        return quantidadeQuartos;
    }

    public void setQuantidadeQuartos(Integer quantidadeQuartos) {
        this.quantidadeQuartos = quantidadeQuartos;
    }

    public Integer getQuantidadeBanheiros() {
        return quantidadeBanheiros;
    }

    public void setQuantidadeBanheiros(Integer quantidadeBanheiros) {
        this.quantidadeBanheiros = quantidadeBanheiros;
    }

    public Double getMetragem() {
        return metragem;
    }

    public void setMetragem(Double metragem) {
        this.metragem = metragem;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Boolean getExibirNoSite() {
        return exibirNoSite;
    }

    public void setExibirNoSite(Boolean exibirNoSite) {
        this.exibirNoSite = exibirNoSite;
    }




    // Getters e Setters das Entidades

    public Proprietario getProprietario() {
        return proprietario;
    }

    public void setProprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
    }

    public Bairro getBairro() {
        return bairro;
    }

    public void setBairro(Bairro bairro) {
        this.bairro = bairro;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Set<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(Set<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public List<Imagem> getImagens() {
        return imagens;
    }

    public void setImagens(List<Imagem> imagens) {
        this.imagens = imagens;
    }

}
