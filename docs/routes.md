# Rotas e Middlewares

Este documento detalha o mapeamento de rotas do sistema e as camadas de proteção aplicadas.

## Estrutura de Rotas

A API está organizada em três grupos principais de rotas:

### 1. Autenticação (`/auth`)
Rotas públicas para gerenciamento de acesso.
- `POST /auth/register`: Cadastro de novos usuários.
- `POST /auth/login`: Autenticação de usuários.

### 2. Perfil (`/profile`)
Rotas privadas para gerenciamento de dados do usuário logado.
- `GET /profile`: Recupera dados do perfil.
- `PUT /profile`: Atualiza dados do perfil.
- `DELETE /profile`: Encerra a conta do usuário.

### 3. Tarefas (`/tasks`)
Rotas privadas para CRUD de tarefas.
- `GET /tasks`: Lista tarefas do usuário.
- `POST /tasks`: Cria nova tarefa.
- `PUT /tasks/:id`: Atualiza tarefa específica.
- `DELETE /tasks/:id`: Remove tarefa específica.

---

## Proteção (Middlewares)

### `authMiddleware`
Este middleware é responsável por interceptar as requisições para rotas privadas e validar o token JWT.

- **Aplicado em:** `/profile/*` e `/tasks/*`.
- **Funcionamento:**
  1. Verifica a presença do header `Authorization`.
  2. Valida o formato `Bearer <TOKEN>`.
  3. Verifica a assinatura do token usando o `JWT_SECRET`.
  4. Extrai o `id` do usuário do payload e o anexa ao objeto `req` (`req.userId`).
  5. Em caso de erro, interrompe a requisição com status `401`.
