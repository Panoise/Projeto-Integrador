package com.uffs.imobiliaria.model.classes;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class Usuario {

    //ID único.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nome;
    private String email;
    private String senha;
    private String perfil;


    //Construtor vazio pro JPA.
    public Usuario(){
    }

    //Construtor padrão.
    public Usuario(String nome, Long id, String email, String senha, String perfil) {
        this.nome = nome;
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.perfil = perfil;
    }


    //Getters e Setters.

    public Long getid() {
        return id;
    }

    public void setid(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

}
