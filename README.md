# Taskly 📋

Um aplicativo de gerenciamento de tarefas com **frontend em React + backend em Node.js (Express + MongoDB)**. O sistema permite cadastrar-se, fazer login, e criar, editar, filtrar e gerenciar tarefas, tudo com autenticação de usuários via JWT.

Desenvolvido durante o programa trainee da ICMC Jr. 🚀

## Protótipo no Figma 🎨

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/design/Txe953AxhH7ALnScyWS7jA/Projeto-EJ?node-id=0-1&t=lnUopxMDIJufC7iz-1).

## Status do projeto 🚧

- Frontend completo
- Backend completo
- Autenticação (JWT) funcionando
- CRUD de tarefas funcionando
- Rotas protegidas no frontend

## Funcionalidades 🧩

### Autenticação 🔐
- Cadastro de usuário (nome, CPF, data de nascimento, e-mail e senha)
- Login com JWT
- Atualização de perfil
- Exclusão de conta
- Rotas privadas: páginas internas exigem login e a sessão expira automaticamente quando o token é inválido

### Tarefas 📋
- Criar, editar e deletar tarefas
- Listar apenas as tarefas do usuário logado
- Busca por título/descrição
- Filtro por status (Em andamento, Concluído, Atrasado)
- Status **"Atrasado" calculado automaticamente** quando a data/hora da tarefa vence (não é gravado no banco — é derivado da data)
- Tarefas concluídas aparecem com o texto riscado e são movidas para o final da lista
- Interface responsiva (desktop e mobile)

## Tecnologias utilizadas ⚙️

### Frontend
- ReactJS
- Vite
- React Router DOM
- Axios
- Phosphor Icons
- JavaScript (ES6+)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

## Estrutura do projeto 📁

```bash
taskly/
├── frontend/   # Aplicação React + Vite
├── backend/    # API REST com Express + MongoDB
└── docs/       # Documentação técnica
```

> Cada pasta (`frontend/` e `backend/`) possui seu próprio README com detalhes específicos.

## Como rodar o projeto localmente 💻

Pré-requisitos: **Node.js** instalado e **MongoDB** (local ou via Atlas).

### 1. Clonar o repositório
```bash
git clone https://github.com/mjepis7/taskly.git
```

### Backend

```bash
# entrar na pasta backend
cd backend

# instalar dependências
npm install
```

Crie um arquivo `.env` dentro de `backend/` (use o `.env.example` como base):

```bash
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_segredo_super_secreto
PORT=3000
```

```bash
# rodar em produção
npm start

# ou em desenvolvimento (com reload automático)
npm run dev
```

O backend roda em `http://localhost:3000`.

### Frontend

```bash
# em outro terminal, entrar na pasta frontend
cd frontend

# instalar dependências
npm install

# iniciar ambiente de desenvolvimento
npm run dev
```

O frontend roda em `http://localhost:5173` e consome a API em `http://localhost:3000/api`.

> ⚠️ O frontend precisa do backend rodando. A URL base da API fica em `frontend/src/api.js`.