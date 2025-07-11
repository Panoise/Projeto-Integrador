package com.uffs.imobiliaria.repositories;

import com.uffs.imobiliaria.model.classes.Bairro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BairroRepository extends JpaRepository<Bairro, Long> {
}