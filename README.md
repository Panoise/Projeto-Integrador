# Projeto-Integrador

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




Bem vindo! 


Esse é o Projeto Integrador feito para o semestre 2025.1 das matérias de Prog II, Eng. De Software I e Banco de Dados I. 

Integrantes do grupo: 

Marco Antonio Bernardeli da Veiga - 20230002952 |
Fernando Vidmar - 2311100032

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# Pastas:

## Requisitos:
Essa pasta contém os requisitos funcionais obtidos através das vontades do cliente e da respectiva entrevista realizada. 

## Modelos:
Essa pasta contém todos os modelos do banco de dados. 

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

#Back-end do sistema de gestão imobiliária, desenvolvido com Spring Boot e PostgreSQL.

## Pré-requisitos

- Java (JDK 24 ou superior)
- Maven
- PostgreSQL (servidor de banco de dados)
- Insomnia (ou Postman) para testar a API

## Passos para Configuração e Execução

### 1. Configurar o Banco de Dados

Este projeto requer uma base de dados PostgreSQL. Um backup com a estrutura e dados de exemplo (`imobiliaria_backup.backup`) está incluído.

**a) Crie um novo Banco de Dados Vazio:**
   - Abra o pgAdmin (ou outra ferramenta).
   - Crie uma nova base de dados. Você pode chamá-la de `imobiliaria_db` ou qualquer outro nome.

**b) Restaure o Backup:**
   - Clique com o botão direito na base de dados que você acabou de criar.
   - Selecione a opção **"Restore..."**.
   - Na janela que abrir:
     - Em **Format**, selecione **Custom or tar**.
     - Em **Filename**, clique no ícone de pasta e selecione o arquivo `imobiliaria_backup.backup` que está na raiz deste projeto.
   - Clique no botão **"Restore"**.

Após a restauração, todas as tabelas e dados de exemplo estarão no seu banco de dados.

### 2. Configurar a Aplicação

- Abra o arquivo `src/main/resources/application.properties`.
- Verifique se a linha `spring.datasource.url` aponta para o nome do banco de dados que você criou no passo anterior.
- Verifique se `spring.datasource.username` e `spring.datasource.password` correspondem às suas credenciais do PostgreSQL.

### 3. Executar o Projeto

- Abra um terminal na pasta raiz do projeto.
- Execute o seguinte comando Maven:
  ```bash
  mvn spring-boot:run
