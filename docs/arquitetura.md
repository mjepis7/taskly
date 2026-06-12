# Arquitetura

Visão de alto nível dos componentes do Taskly e de como eles se integram.

## Visão geral

O Taskly é uma aplicação full-stack dividida em duas partes independentes que se comunicam por HTTP (JSON):

```
┌──────────────────────┐        HTTP / JSON        ┌──────────────────────┐        ┌──────────────┐
│      Front-end       │ ───────────────────────▶  │       Back-end       │ ─────▶ │   MongoDB    │
│   React + Vite       │   (Axios, Bearer token)   │  Express (API REST)  │ Mongoose│  (coleções)  │
│   localhost:5173     │ ◀───────────────────────  │   localhost:3000     │ ◀───── │ users, tasks │
└──────────────────────┘                           └──────────────────────┘        └──────────────┘
```

Protótipo de telas: [Figma](https://www.figma.com/design/Txe953AxhH7ALnScyWS7jA/Projeto-EJ?node-id=0-1&t=lnUopxMDIJufC7iz-1).

## Responsabilidades de cada módulo

### Front-end (`frontend/`)
- Renderiza as telas (Welcome, Login, Register, Tasks, NewTask, Profile).
- Valida formulários no cliente (`utils/validations.js`, hook `useForm`).
- Mantém a sessão no `localStorage` (`token` e `userName`).
- Protege rotas privadas (`routes/ProtectedRoute.jsx`) e encerra a sessão automaticamente em respostas `401` (interceptor em `api.js`).
- Deriva o status **"Atrasado"** apenas para exibição/filtro (não persiste esse valor).

### Back-end (`backend/`)
- Expõe a API REST (`/api/auth`, `/api/user`, `/api/tasks`).
- Autentica usuários com JWT e protege rotas com o `authMiddleware`.
- Criptografa senhas com bcrypt.
- Garante que cada usuário acesse apenas as próprias tarefas.

### Banco de dados (MongoDB)
- Persiste as coleções `users` e `tasks` (ver [database.md](../backend/docs/database.md)).
- Relação: cada `Task` referencia o `User` dono pelo campo `usuario` (ObjectId).

## Fluxo de dados

### Login
1. Usuário preenche e-mail/senha na tela de Login.
2. Front envia `POST /api/auth/login`.
3. Back valida as credenciais (bcrypt), gera um JWT (`expiresIn: 1d`) e retorna `{ token, user }`.
4. Front salva `token` e `userName` no `localStorage` e redireciona para `/tasks`.

### Requisição autenticada (ex.: listar tarefas)
1. Front faz `GET /api/tasks`. O interceptor do Axios adiciona o header `Authorization: Bearer <token>`.
2. O `authMiddleware` valida o token e injeta `req.usuario` na requisição.
3. O controller busca no MongoDB apenas as tarefas cujo `usuario` é o do token.
4. Back retorna a lista; o Front aplica busca, filtro e o cálculo visual de "Atrasado".

### Token inválido/expirado
1. Qualquer requisição com token inválido recebe `401` do back.
2. O interceptor de resposta do Front limpa o `localStorage` e redireciona para `/login`.

## Documentação relacionada
- [API](./api.md) — endpoints e modelos
- [Handbook](./handbook.md) — convenções de código
- [Changelog](./changelog.md) — histórico de entregas
- [Back-end / Rotas](../backend/docs/routes.md) e [Banco de dados](../backend/docs/database.md)
- [Front-end / Estrutura](../frontend/docs/structure.md)