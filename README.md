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

# Back-end 

## Pré-requisitos

- Java (JDK 24 ou superior)
- Maven
- PostgreSQL 
- Insomnia 

## Passos para Configuração e Execução

### 1. Configurar o Banco de Dados

Este projeto requer uma base de dados PostgreSQL. Um backup com a estrutura e dados de exemplo (`imobiliaria_backup.backup`) está incluído.

**a) Crie um novo Banco de Dados Vazio:**
   - Abra o pgAdmin 
   - Crie uma nova base de dados. Você pode chamá-la de `imobiliaria_db` ou qualquer outro nome.

**b) Restaure o Backup:**
   - Clique com o botão direito na base de dados que você acabou de criar.
   - Selecione a opção **"Restore..."**.
   - Na janela que abrir:
     - Em **Format**, selecione **Custom or tar**.
     - Em **Filename**, clique no ícone de pasta e selecione o arquivo `imobiliaria_backup.backup` que está na raiz deste projeto.
   - Clique no botão **"Restore"**.

Após a restauração, todas as tabelas e dados de exemplo estarão no seu banco de dados.

### 2. Importar o CRUD pro Insomnia 

** a) Clique em Import no Insomnia 

** b) Selecione o arquivo `CRUD_imobiliaria_insomnia`

### 3. Executar o Projeto

-- Navegue até Imobiliaria\src\main\java\com\uffs\imobiliaria

-- Execute o `ImobiliariaApplication`

-- Se todos os passos anteriores foram executados corretamente, vai estar funcionando. 
