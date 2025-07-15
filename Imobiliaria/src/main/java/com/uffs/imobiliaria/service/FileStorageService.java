package com.uffs.imobiliaria.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {

    // Define o diretório onde as imagens serão salvas.
    private final Path fileStorageLocation;

    public FileStorageService() {
        // "uploads" será uma pasta na raiz do seu projeto.
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

        try {
            // Cria o diretório se ele não existir.
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Não foi possível criar o diretório para armazenar os arquivos.", ex);
        }
    }

    /**
     * Salva o arquivo no disco.
     * @param file O arquivo enviado pelo frontend.
     * @param imovelId O ID do imóvel para criar uma subpasta organizada.
     * @return O caminho relativo do arquivo salvo.
     */
    public String storeFile(MultipartFile file, Long imovelId) {
        // Gera um nome de arquivo único para evitar conflitos.
        String originalFileName = file.getOriginalFilename();
        String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;

        try {
            // Verifica se o nome do arquivo contém caracteres inválidos.
            if (uniqueFileName.contains("..")) {
                throw new RuntimeException("Nome de arquivo contém sequência de caminho inválida " + uniqueFileName);
            }

            // Cria uma subpasta para cada imóvel para manter os arquivos organizados.
            Path imovelDirectory = this.fileStorageLocation.resolve("imovel_" + imovelId);
            Files.createDirectories(imovelDirectory);

            // Copia o arquivo para o local de destino.
            Path targetLocation = imovelDirectory.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Retorna o caminho relativo para ser salvo no banco de dados.
            return "uploads/imovel_" + imovelId + "/" + uniqueFileName;

        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível armazenar o arquivo " + uniqueFileName + ". Por favor, tente novamente!", ex);
        }
    }
}
