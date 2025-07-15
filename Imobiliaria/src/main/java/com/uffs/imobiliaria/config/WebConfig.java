package com.uffs.imobiliaria.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                // --- CORREÇÃO AQUI: Adicionado o método "PATCH" ---
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Pega o caminho absoluto para o diretório 'uploads'
        String uploadDir = Paths.get("uploads").toFile().getAbsolutePath();

        // Garante que o caminho seja formatado como uma URL de arquivo válida
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/" + uploadDir.replace("\\", "/") + "/");
    }
}
