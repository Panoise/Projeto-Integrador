package com.uffs.imobiliaria.dto;

import com.uffs.imobiliaria.model.classes.Endereco;

import java.util.List;
import java.util.Set;


public class ImovelDTO {
    private Long id;
    private String tipoFinalidade;
    private String valorVenda;
    private String status;
    private Integer quantidadeQuartos;
    private Integer quantidadeBanheiros;
    private Double metragem;

    private Endereco endereco;


   //Entidades
    private ProprietarioDTO proprietario;
    private CategoriaDTO categoria;
    private BairroDTO bairro;
    private Set<CaracteristicaDTO> caracteristicas;
    private List<ImagemDTO> imagens;
    private Boolean exibirNoSite;

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
    public Endereco getEndereco() {
        return endereco;
    }
    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
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
    //Entidades

    public ProprietarioDTO getProprietario() {
        return proprietario;
    }
    public void setProprietario(ProprietarioDTO proprietario) {
        this.proprietario = proprietario;
    }

    public BairroDTO getBairro() {
        return bairro;
    }

    public void setBairro(BairroDTO bairro) {
        this.bairro = bairro;
    }

    public CategoriaDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaDTO categoria) {
        this.categoria = categoria;
    }

    public Set<CaracteristicaDTO> getCaracteristicas() {
        return caracteristicas;
    }
    public void setCaracteristicas(Set<CaracteristicaDTO> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public List<ImagemDTO> getImagens() {
        return imagens;
    }

    public void setImagens(List<ImagemDTO> imagens) {
        this.imagens = imagens;
    }

    public Boolean getExibirNoSite() {
        return exibirNoSite;
    }

    public void setExibirNoSite(Boolean exibirNoSite) {
        this.exibirNoSite = exibirNoSite;
    }
}


