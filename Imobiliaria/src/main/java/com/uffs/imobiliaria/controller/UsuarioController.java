package com.uffs.imobiliaria.controller;

import com.uffs.imobiliaria.model.classes.Usuario;
import com.uffs.imobiliaria.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Busca todos os usuários. Permite filtrar por nome ou perfil.
     * Ex: GET /api/usuarios
     * Ex: GET /api/usuarios?nome=Marco
     * Ex: GET /api/usuarios?perfil=ADMIN
     */
    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String perfil) {

        List<Usuario> usuarios;
        if (nome != null) {
            usuarios = usuarioService.findByNomeContaining(nome);
        } else if (perfil != null) {
            usuarios = usuarioService.findByPerfil(perfil);
        } else {
            usuarios = usuarioService.findAll();
        }
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        return usuarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Usuario> getUsuarioByEmail(@PathVariable String email) {
        return usuarioService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.save(usuario);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetails) {
        return usuarioService.update(id, usuarioDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        try {
            usuarioService.deleteById(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // Retorna 404 Not Found se o usuário não existir
        }
    }
}
