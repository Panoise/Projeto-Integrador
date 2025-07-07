package com.uffs.imobiliaria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.uffs.imobiliaria.model.classes")

@EnableJpaRepositories(basePackages = "com.uffs.imobiliaria.repositories")
public class ImobiliariaApplication {


    public static void main(String[] args) {
        SpringApplication.run(ImobiliariaApplication.class, args);
        System.out.println(">>> Aplicação iniciada com sucesso!");
        System.out.println(">>> Servidor pronto para receber requisições na porta 8080.");
    }
}
