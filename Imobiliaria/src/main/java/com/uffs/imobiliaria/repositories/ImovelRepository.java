package com.uffs.imobiliaria.repositories;

import com.uffs.imobiliaria.model.classes.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImovelRepository extends JpaRepository<Imovel, Long> {
}
