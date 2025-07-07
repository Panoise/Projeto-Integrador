package com.uffs.imobiliaria.service;

import com.uffs.imobiliaria.model.classes.Categoria;
import com.uffs.imobiliaria.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Categoria> findById(Long id) {
        return categoriaRepository.findById(id);
    }

    @Transactional
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public void deleteById(Long id) {
        categoriaRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return categoriaRepository.existsById(id);
    }

    @Transactional
    public Optional<Categoria> update(Long id, Categoria categoriaDetails) {
        return categoriaRepository.findById(id)
                .map(categoriaExistente -> {
                    categoriaExistente.setNome(categoriaDetails.getNome());
                    return categoriaRepository.save(categoriaExistente);
                });
    }
}