package com.uffs.imobiliaria.controller;

import com.uffs.imobiliaria.model.classes.Proprietario;
import com.uffs.imobiliaria.service.ProprietarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proprietarios")
public class ProprietarioController {

    @Autowired
    private ProprietarioService proprietarioService;


    @PostMapping
    public ResponseEntity<Proprietario> createProprietario(@RequestBody Proprietario proprietario) {
        Proprietario novoProprietario = proprietarioService.save(proprietario);
        return new ResponseEntity<>(novoProprietario, HttpStatus.CREATED); // Retorna 201 Created
    }


    @GetMapping
    public ResponseEntity<List<Proprietario>> getAllProprietarios() {
        List<Proprietario> proprietarios = proprietarioService.findAll();
        return ResponseEntity.ok(proprietarios); // Retorna 200 OK com a lista
    }


    @GetMapping("/{id}")
    public ResponseEntity<Proprietario> getProprietarioById(@PathVariable Long id) {
        Optional<Proprietario> proprietarioOptional = proprietarioService.findById(id);


        return proprietarioOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Proprietario> updateProprietario(@PathVariable Long id, @RequestBody Proprietario proprietarioDetails) {
        Optional<Proprietario> proprietarioOptional = proprietarioService.findById(id);

        if (proprietarioOptional.isPresent()) {
            Proprietario proprietarioExistente = proprietarioOptional.get();


            proprietarioExistente.setNome(proprietarioDetails.getNome());
            proprietarioExistente.setCpf(proprietarioDetails.getCpf());
            proprietarioExistente.setEmail(proprietarioDetails.getEmail());
            proprietarioExistente.setNome(proprietarioDetails.getNome());
            proprietarioExistente.setCpf(proprietarioDetails.getCpf());
            proprietarioExistente.setEmail(proprietarioDetails.getEmail());
            proprietarioExistente.setRg(proprietarioDetails.getRg());
            proprietarioExistente.setSexo(proprietarioDetails.getSexo());
            proprietarioExistente.setNacionalidade(proprietarioDetails.getNacionalidade());
            proprietarioExistente.setOrgaoExpedidor(proprietarioDetails.getOrgaoExpedidor());
            proprietarioExistente.setDataExpedicaoRg(proprietarioDetails.getDataExpedicaoRg());
            proprietarioExistente.setNaturalidade(proprietarioDetails.getNaturalidade());
            proprietarioExistente.setNomePai(proprietarioDetails.getNomePai());
            proprietarioExistente.setNomeMae(proprietarioDetails.getNomeMae());
            proprietarioExistente.setDataNascimento(proprietarioDetails.getDataNascimento());
            proprietarioExistente.setEstadoCivil(proprietarioDetails.getEstadoCivil());
            proprietarioExistente.setObservacao(proprietarioDetails.getObservacao());
            proprietarioExistente.setTelefone(proprietarioDetails.getTelefone());

            Proprietario proprietarioAtualizado = proprietarioService.save(proprietarioExistente);
            return ResponseEntity.ok(proprietarioAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProprietario(@PathVariable Long id) {

        if (proprietarioService.existsById(id)) {
            proprietarioService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Proprietario> patchProprietario(@PathVariable Long id, @RequestBody Proprietario proprietarioDetails) {
        Optional<Proprietario> proprietarioAtualizado = proprietarioService.patch(id, proprietarioDetails);

        return proprietarioAtualizado
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}


