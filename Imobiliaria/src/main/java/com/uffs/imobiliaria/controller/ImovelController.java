package com.uffs.imobiliaria.controller;

import com.uffs.imobiliaria.dto.ImovelDTO;
import com.uffs.imobiliaria.model.classes.Imovel;
import com.uffs.imobiliaria.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imoveis") // A rota base para imóveis
public class ImovelController {

    @Autowired
    private ImovelService imovelService; // A instância injetada pelo Spring

    // --- ENDPOINTS DE LEITURA (READ) ---
    @GetMapping
    public ResponseEntity<List<ImovelDTO>> getAllImoveis() {
        List<ImovelDTO> imoveis = imovelService.findAll();
        return ResponseEntity.ok(imoveis);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImovelDTO> getImovelById(@PathVariable Long id) {
        return imovelService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/por-proprietario/{proprietarioId}")
    public ResponseEntity<List<ImovelDTO>> getImoveisByProprietario(@PathVariable Long proprietarioId) {
        List<ImovelDTO> imoveis = imovelService.findByProprietarioId(proprietarioId);
        if (imoveis.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 se não houver imóveis
        }
        return ResponseEntity.ok(imoveis);
    }

    // --- ENDPOINT DE CRIAÇÃO (CREATE) ---
    @PostMapping
    public ResponseEntity<Imovel> createImovel(@RequestBody Imovel imovel) {
        // O frontend envia um Imovel, e o serviço lida com a lógica de salvar
        Imovel novoImovel = imovelService.save(imovel);
        return new ResponseEntity<>(novoImovel, HttpStatus.CREATED);
    }

    // --- ENDPOINT DE ATUALIZAÇÃO COMPLETA (UPDATE - PUT) ---
    @PutMapping("/{id}")
    public ResponseEntity<ImovelDTO> updateImovel(@PathVariable Long id, @RequestBody Imovel imovelDetails) {
        return imovelService.update(id, imovelDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // --- ENDPOINT DE ATUALIZAÇÃO PARCIAL (PATCH) ---
    @PatchMapping("/{id}")
    public ResponseEntity<ImovelDTO> patchImovel(@PathVariable Long id, @RequestBody Imovel imovelDetails) {
        // CORREÇÃO: Chamando o método 'patch' a partir da instância 'imovelService'
        return imovelService.patch(id, imovelDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // --- ENDPOINT DE DELEÇÃO (DELETE) ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImovel(@PathVariable Long id) {
        // CORREÇÃO: Chamando o método 'existsById' a partir da instância 'imovelService'
        if (imovelService.existsById(id)) {
            imovelService.deleteById(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Retorna 404 Not Found
        }
    }




}
