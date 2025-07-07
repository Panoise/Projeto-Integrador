package com.uffs.imobiliaria.repositories;

import com.uffs.imobiliaria.model.classes.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}