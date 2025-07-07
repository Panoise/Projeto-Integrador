package com.uffs.imobiliaria.controller;

import com.uffs.imobiliaria.model.classes.Caracteristica;
import com.uffs.imobiliaria.service.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/caracteristicas")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService caracteristicaService;

    @PostMapping
    public ResponseEntity<Caracteristica> createCaracteristica(@RequestBody Caracteristica caracteristica) {
        return new ResponseEntity<>(caracteristicaService.save(caracteristica), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Caracteristica>> getAllCaracteristicas() {
        return ResponseEntity.ok(caracteristicaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caracteristica> getCaracteristicaById(@PathVariable Long id) {
        return caracteristicaService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Caracteristica> updateCaracteristica(@PathVariable Long id, @RequestBody Caracteristica caracteristicaDetails) {
        return caracteristicaService.update(id, caracteristicaDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCaracteristica(@PathVariable Long id) {
        if (caracteristicaService.existsById(id)) {
            caracteristicaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}