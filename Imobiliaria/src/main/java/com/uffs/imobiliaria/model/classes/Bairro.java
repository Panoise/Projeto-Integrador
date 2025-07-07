package com.uffs.imobiliaria.model.classes;

import jakarta.persistence.*;


@Entity
public class Bairro {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String nome;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Bairro(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public Bairro() {
    }
}
