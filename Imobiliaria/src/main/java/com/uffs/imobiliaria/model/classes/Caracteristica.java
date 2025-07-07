package com.uffs.imobiliaria.model.classes;

import jakarta.persistence.*;

@Entity
public class Caracteristica {

    private String nome;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Caracteristica(String nome, Long id) {
        this.nome = nome;
        this.id = id;
    }

    public Caracteristica() {
    }
}
