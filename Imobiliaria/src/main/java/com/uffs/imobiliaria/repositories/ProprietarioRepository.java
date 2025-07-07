package com.uffs.imobiliaria.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProprietarioRepository extends JpaRepository<com.uffs.imobiliaria.model.classes.Proprietario, Long>{



}
