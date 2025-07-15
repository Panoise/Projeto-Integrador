package com.uffs.imobiliaria.controller.images;

import com.uffs.imobiliaria.model.classes.Imagem;
import com.uffs.imobiliaria.model.classes.Imovel;
import com.uffs.imobiliaria.repositories.ImagemRepository;
import com.uffs.imobiliaria.repositories.ImovelRepository;
import com.uffs.imobiliaria.service.FileStorageService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private ImagemRepository imagemRepository;

    @PostMapping("/imovel/{imovelId}")
    public ResponseEntity<String> uploadImagemImovel(@PathVariable Long imovelId, @RequestParam("file") MultipartFile file) {
        Imovel imovel = imovelRepository.findById(imovelId)
                .orElseThrow(() -> new EntityNotFoundException("Imóvel com ID " + imovelId + " não encontrado."));
        String caminhoArquivo = fileStorageService.storeFile(file, imovelId);
        Imagem novaImagem = new Imagem();
        novaImagem.setCaminho(caminhoArquivo);
        novaImagem.setImovel(imovel);
        imagemRepository.save(novaImagem);
        return ResponseEntity.ok("Upload da imagem realizado com sucesso: " + caminhoArquivo);
    }

    /**
     * --- NOVO MÉTODO PARA EXCLUIR UMA IMAGEM ---
     * @param imageId O ID da imagem a ser excluída.
     * @return Uma resposta de sucesso ou erro.
     */
    @DeleteMapping("/imagem/{imageId}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long imageId) {
        // 1. Encontra a imagem no banco de dados
        Imagem imagem = imagemRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Imagem com ID " + imageId + " não encontrada."));

        // 2. Tenta excluir o arquivo físico do servidor
        try {
            Path filePath = Paths.get(imagem.getCaminho());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Loga o erro mas não impede a exclusão do registro do banco
            System.err.println("Erro ao deletar o arquivo físico: " + e.getMessage());
        }

        // 3. Exclui o registro da imagem do banco de dados
        imagemRepository.delete(imagem);

        return ResponseEntity.noContent().build(); // Retorna 204 No Content
    }
}
