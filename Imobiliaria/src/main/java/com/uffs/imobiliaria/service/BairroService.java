package com.uffs.imobiliaria.service;

import com.uffs.imobiliaria.model.classes.Bairro;
import com.uffs.imobiliaria.repositories.BairroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BairroService {

    @Autowired
    private BairroRepository bairroRepository;

    @Transactional(readOnly = true)
    public List<Bairro> findAll() {
        return bairroRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Bairro> findById(Long id) {
        return bairroRepository.findById(id);
    }

    @Transactional
    public Bairro save(Bairro bairro) {
        return bairroRepository.save(bairro);
    }

    @Transactional
    public void deleteById(Long id) {
        bairroRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return bairroRepository.existsById(id);
    }

    @Transactional
    public Optional<Bairro> update(Long id, Bairro bairroDetails) {
        return bairroRepository.findById(id)
                .map(bairroExistente -> {
                    bairroExistente.setNome(bairroDetails.getNome());
                    return bairroRepository.save(bairroExistente);
                });
    }
}