package com.uffs.imobiliaria.service;

import com.uffs.imobiliaria.model.classes.Caracteristica;
import com.uffs.imobiliaria.repositories.CaracteristicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    @Transactional(readOnly = true)
    public List<Caracteristica> findAll() {
        return caracteristicaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Caracteristica> findById(Long id) {
        return caracteristicaRepository.findById(id);
    }

    @Transactional
    public Caracteristica save(Caracteristica caracteristica) {
        return caracteristicaRepository.save(caracteristica);
    }

    @Transactional
    public void deleteById(Long id) {
        caracteristicaRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return caracteristicaRepository.existsById(id);
    }

    @Transactional
    public Optional<Caracteristica> update(Long id, Caracteristica caracteristicaDetails) {
        return caracteristicaRepository.findById(id)
                .map(caracteristicaExistente -> {
                    caracteristicaExistente.setNome(caracteristicaDetails.getNome());
                    return caracteristicaRepository.save(caracteristicaExistente);
                });
    }
}
