package com.uffs.imobiliaria.repositories;

import com.uffs.imobiliaria.model.classes.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

   //Busca Usuario por email.
    Optional<Usuario> findByEmail(String email);

    //Busca por perfil
    List<Usuario> findByPerfil(String perfil);

    //Busca pelo texto fornecido
    List<Usuario> findByNomeContainingIgnoreCase(String nome);

}
