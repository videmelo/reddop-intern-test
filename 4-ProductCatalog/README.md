# Sistema de Gestão de Catálogo de Produtos

## Tecnologias Utilizadas

### Backend
- **.NET 10.0**
- **Entity Framework Core**
- **SQLite**

### Frontend
- **Angular 18**
- **TypeScript**
- **Bootstrap 5**

## Pré-requisitos

Para rodar este projeto na sua máquina, você precisará ter instalado:

1. **.NET 10.0 SDK** (Para rodar e compilar o Backend)
2. **NodeJS e NPM** (Para gerenciar pacotes do Frontend)
3. **Angular CLI** (Interface de linha de comando do Angular). Para instalar, rode no terminal:
   ```bash
   npm install -g @angular/cli
   ```

## Como Rodar o Projeto

O projeto é dividido em duas partes que precisam ser executadas simultaneamente em terminais separados.

### 1. Rodando o Backend (API)

O backend já está configurado para gerar e utilizar o banco de dados SQLite automaticamente.

1. Abra um terminal.
2. Navegue até a pasta do backend:
   ```bash
   cd ProductCatalog/Backend
   ```
3. Restaure as dependências e inicie a API:
   ```bash
   dotnet run
   ```
4. A API estará rodando (geralmente em `http://localhost:5266`).

### 2. Rodando o Frontend (Interface Web)

1. Abra um novo terminal:
2. Navegue até a pasta do frontend:
   ```bash
   cd ProductCatalog/Frontend
   ```
3. Instale as dependências do projeto:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento do Angular:
   ```bash
   ng serve
   ```
5. Abra o seu navegador e acesse a aplicação web no endereço:
   ```
   http://localhost:4200
   ```