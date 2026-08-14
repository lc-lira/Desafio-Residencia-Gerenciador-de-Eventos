# Desafio-Residência-Gerenciador-de-Eventos

## Sobre o Projeto
O **Gerenciador de Eventos** é uma aplicação web desenvolvida para facilitar a criação, visualização e organização de eventos. 
O sistema conta com controle de acesso, permitindo que administradores se cadastrem de forma segura para gerenciar seus próprios eventos (com informações de data, local, imagens, etc.).

---

## Links Importantes

*   **Aplicação Web (Frontend):** [Acesse o site hospedado na Vercel](https://gerenciador-de-eventos-web.vercel.app)
*   **Documentação da API (Swagger):**[Acesse a documentação da API](https://desafio-residencia-gerenciador-de.onrender.com/swagger-ui/index.html)
> **Nota:** Como o back-end está hospedado no plano gratuito do Render, a API pode levar cerca de 1 a 3 minutos para "acordar" na primeira requisição do dia.
---

## Tecnologias Utilizadas

### Frontend (Web)
*   **React** (utilizando **Vite**)
*   **Axios / Fetch API** (para consumo da API)
*   **Vercel** (Hospedagem e CI/CD)

### Backend (API)
*   **Java 17**
*   **Spring Boot 3.2.5**
*   **Spring Security & JWT** (Para autenticação e proteção das rotas)
*   **Spring Data JPA** (Mapeamento objeto-relacional)
*   **Banco de Dados H2** (Banco em memória para testes e desenvolvimento rápido)
*   **Springdoc OpenAPI / Swagger** (Geração automática da documentação da API)
*   **Lombok** (Redução de código boilerplate)

---

## Como rodar o projeto localmente

### Rodando o Backend
1. Certifique-se de ter o **Java 17** e o **Maven** instalados na sua máquina.
2. Clone este repositório.
3. Navegue até a pasta raiz do projeto backend (`backend/gerenciador_eventos`).
4. Verifique se o arquivo `src/main/resources/application.properties` contém a variável de ambiente para a geração de tokens (exemplo: `api.security.token.secret=sua-chave-secreta-aqui`).
5. Execute a aplicação via terminal ou pela sua IDE de preferência (como VS Code, IntelliJ ou Eclipse).
6. Com a aplicação rodando, acesse o link do Swagger no seu navegador para testar as requisições da API de forma interativa.

### Rodando o Frontend
1. Navegue até a pasta do projeto frontend.
2. Instale as dependências executando `npm install` (ou `yarn install`).
3. Crie um arquivo `.env` na raiz do frontend e configure a URL da sua API local (ex: `VITE_API_URL=http://localhost:8080`).
4. Inicie o servidor de desenvolvimento do Vite executando `npm run dev` (ou `yarn dev`).
