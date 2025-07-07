package com.uffs.imobiliaria.dto;

import com.uffs.imobiliaria.model.classes.Endereco;


public class ImovelDTO {
    private Long id;
    private String tipoFinalidade;
    private String valorVenda;
    private String status;
    private Endereco endereco;
    private ProprietarioDTO proprietario;

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
    public ProprietarioDTO getProprietario() {
        return proprietario;
    }
    public void setProprietario(ProprietarioDTO proprietario) {
        this.proprietario = proprietario;
    }
}