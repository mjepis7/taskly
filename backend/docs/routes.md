# Rotas

Rotas da API agrupadas por módulo. Todas têm o prefixo `/api`. A especificação completa (request/response) está em [../../docs/api.md](../../docs/api.md).

## Health check
| Método | Rota | Middlewares | Descrição                        |
|--------|------|-------------|----------------------------------|
| GET    | `/`  | —           | Confirma que o servidor está no ar |

## `/api/auth` (público) — `src/routes/authRoutes.js`
| Método | Rota        | Middlewares | Controller            | Descrição              |
|--------|-------------|-------------|-----------------------|------------------------|
| POST   | `/register` | —           | `authController.registrar` | Cadastra usuário  |
| POST   | `/login`    | —           | `authController.login`     | Login + token JWT |

## `/api/user` (protegido) — `src/routes/userRoutes.js`
| Método | Rota  | Middlewares     | Descrição                       |
|--------|-------|-----------------|---------------------------------|
| GET    | `/me` | `authMiddleware`| Dados do usuário logado         |
| PUT    | `/me` | `authMiddleware`| Atualiza o perfil               |
| DELETE | `/me` | `authMiddleware`| Exclui a conta                  |

## `/api/tasks` (protegido) — `src/routes/taskRoutes.js`
| Método | Rota    | Middlewares     | Controller                    | Descrição              |
|--------|---------|-----------------|-------------------------------|------------------------|
| GET    | `/`     | `authMiddleware`| `taskController.listarTarefas`| Lista tarefas do usuário |
| POST   | `/`     | `authMiddleware`| `taskController.criarTarefa`  | Cria tarefa            |
| PUT    | `/:id`  | `authMiddleware`| `taskController.atualizarTarefa`| Atualiza tarefa      |
| DELETE | `/:id`  | `authMiddleware`| `taskController.deletarTarefa`| Remove tarefa          |

## Middlewares

### `authMiddleware` (`src/middlewares/authMiddleware.js`)
- Lê o header `Authorization` e exige o formato `Bearer <token>`.
- Verifica o JWT com `JWT_SECRET`.
- Em caso de sucesso, injeta `req.usuario = { id, email }` e segue.
- Em caso de falha, responde `401` com `{ erro: '...' }`.

### Middlewares globais (`src/server.js`)
- `cors` — libera origem `http://localhost:5173`.
- `express.json()` — faz o parse do corpo JSON.
- **404** — rota não encontrada → `{ erro: 'Rota não encontrada.' }`.
- **Handler de erro global** — captura exceções → `500 { erro: 'Erro interno do servidor' }`.

> **Validação:** atualmente a validação dos dados acontece no schema do Mongoose (e no front). Não há uma camada de middleware de validação dedicada (ex.: Joi/Zod) — é um ponto de evolução possível.