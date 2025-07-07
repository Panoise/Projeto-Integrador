package com.uffs.imobiliaria.controller;


import com.uffs.imobiliaria.dto.ImovelDTO;
import com.uffs.imobiliaria.model.classes.Imovel;
import com.uffs.imobiliaria.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/imoveis")
public class ImovelController {

    @Autowired
    private ImovelService imovelService;


    @PostMapping
    public ResponseEntity<Imovel> createImovel(@RequestBody Imovel imovel) {
        try {
            Imovel novoImovel = imovelService.save(imovel);

            return new ResponseEntity<>(novoImovel, HttpStatus.CREATED);
        } catch (Exception e) {

            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping
    public ResponseEntity<List<ImovelDTO>> getAllImoveis() {
        List<ImovelDTO> imoveisDTO = imovelService.findAll();
        return ResponseEntity.ok(imoveisDTO);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ImovelDTO> getImovelById(@PathVariable Long id) {
        return imovelService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<ImovelDTO> updateImovel(@PathVariable Long id, @RequestBody Imovel imovelDetails) {
        return imovelService.update(id, imovelDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImovel(@PathVariable Long id) {
        if (imovelService.existsById(id)) {
            imovelService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PatchMapping("/{id}")
    public ResponseEntity<ImovelDTO> patchImovel(@PathVariable Long id, @RequestBody Imovel imovelDetails) {
        return imovelService.patch(id, imovelDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
