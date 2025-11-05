# 🎬 Movieflix API

A **Movieflix API** é uma aplicação RESTful desenvolvida com **Node.js**, **Express**, **TypeScript**, **Prisma ORM** e **PostgreSQL**, projetada para gerenciar um catálogo de filmes.  
A API permite **cadastrar, listar, atualizar (total ou parcial) e deletar filmes**, além de **filtrar por gênero**, com **documentação interativa via Swagger UI**.

---

## 🧩 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript  
- **Express** — Framework para criação das rotas e middlewares  
- **TypeScript** — Tipagem estática e segurança no código  
- **Prisma ORM** — Integração com o banco de dados PostgreSQL  
- **Swagger UI** — Documentação interativa da API  
- **PostgreSQL** — Banco de dados relacional

---

## ⚙️ Instalação e Execução

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/EnrikPaulo/movieflix-api.git
cd movieflix-api
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o arquivo .env
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

```bash
DATABASE_URL="postgresql://postgres:seu_usuario@localhost:5433/movieflix?schema=public"
```

⚠️ Importante:
Substitua seu_usuario e a porta (5433, caso diferente na sua máquina) pelos dados do seu ambiente local.
O arquivo .env não deve ser versionado no Git — ele já está no .gitignore.

### 4️⃣ Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

### 5️⃣ Inicie o servidor

```bash
npm run dev
```

O servidor será executado em:
➡️ http://localhost:3000


### 📘 Documentação (Swagger)

Após iniciar o servidor, acesse a documentação completa das rotas em:

🔗 http://localhost:3000/docs


### 🧠 Endpoints Principais 

|   Método   | Rota                 | Descrição                                  |
| :--------: | :------------------- | :----------------------------------------- |
|   **GET**  | `/movies`            | Retorna todos os filmes cadastrados        |
|  **POST**  | `/movies`            | Cadastra um novo filme                     |
|   **PUT**  | `/movies/:id`        | Atualiza completamente um filme            |
|  **PATCH** | `/movies/:id`        | Atualiza parcialmente os dados de um filme |
| **DELETE** | `/movies/:id`        | Remove um filme pelo ID                    |
|   **GET**  | `/movies/:genreName` | Filtra filmes por gênero                   |



### 🧾 Exemplo de Objeto de Filme

```bash
{
  "title": "A Origem",
  "genre_id": 5,
  "language_id": 1,
  "oscar_count": 4,
  "release_date": "2010-07-16"
}
```


### 🧰 Scripts Disponíveis

| Comando                  | Descrição                                     |
| :----------------------- | :-------------------------------------------- |
| `npm run dev`            | Executa o servidor em modo de desenvolvimento |
| `npx prisma studio`      | Abre o painel visual do Prisma                |
| `npx prisma migrate dev` | Executa as migrações no banco de dados        |




### 🧑‍💻 Autor

Enrik Paulo Lemes da Silva
