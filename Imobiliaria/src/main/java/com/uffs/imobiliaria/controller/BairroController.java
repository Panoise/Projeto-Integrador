package com.uffs.imobiliaria.controller;

import com.uffs.imobiliaria.model.classes.Bairro;
import com.uffs.imobiliaria.service.BairroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bairros")
public class BairroController {

    @Autowired
    private BairroService bairroService;

    @PostMapping
    public ResponseEntity<Bairro> createBairro(@RequestBody Bairro bairro) {
        return new ResponseEntity<>(bairroService.save(bairro), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Bairro>> getAllBairros() {
        return ResponseEntity.ok(bairroService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bairro> getBairroById(@PathVariable Long id) {
        return bairroService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bairro> updateBairro(@PathVariable Long id, @RequestBody Bairro bairroDetails) {
        return bairroService.update(id, bairroDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBairro(@PathVariable Long id) {
        if (bairroService.existsById(id)) {
            bairroService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}