package com.uffs.imobiliaria.service;

import com.uffs.imobiliaria.model.classes.Usuario;
import com.uffs.imobiliaria.repositories.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Transactional
    public Usuario save(Usuario usuario) {
        // IMPORTANTE: Em um sistema real, a senha NUNCA deve ser salva como texto puro.
        // Aqui é o lugar ideal para criptografar a senha antes de salvar.
        // Ex: usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Optional<Usuario> update(Long id, Usuario usuarioDetails) {
        return usuarioRepository.findById(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNome(usuarioDetails.getNome());
                    usuarioExistente.setEmail(usuarioDetails.getEmail());
                    usuarioExistente.setPerfil(usuarioDetails.getPerfil());
                    // Não atualizamos a senha aqui por padrão, a menos que seja uma funcionalidade específica
                    return usuarioRepository.save(usuarioExistente);
                });
    }

    @Transactional
    public void deleteById(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new EntityNotFoundException("Usuário com ID " + id + " não encontrado.");
        }
        usuarioRepository.deleteById(id);
    }

    // Métodos que usam as buscas customizadas do repositório
    @Transactional(readOnly = true)
    public Optional<Usuario> findByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public List<Usuario> findByPerfil(String perfil) {
        return usuarioRepository.findByPerfil(perfil);
    }

    @Transactional(readOnly = true)
    public List<Usuario> findByNomeContaining(String nome) {
        return usuarioRepository.findByNomeContainingIgnoreCase(nome);
    }
}
