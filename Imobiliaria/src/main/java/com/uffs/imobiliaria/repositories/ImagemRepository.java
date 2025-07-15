package com.uffs.imobiliaria.repositories;

import com.uffs.imobiliaria.model.classes.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagemRepository extends JpaRepository<Imagem, Long> {
    // Por enquanto, os métodos padrão do JpaRepository são suficientes.
}
