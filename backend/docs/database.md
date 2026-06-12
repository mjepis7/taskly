# Banco de dados

O Taskly usa **MongoDB** com **Mongoose**. Há duas coleções: `users` e `tasks`.

## Coleção `users`

Schema definido em `src/models/User.js`.

| Campo            | Tipo   | Regras                                          |
|------------------|--------|-------------------------------------------------|
| `nome`           | String | obrigatório, `trim`                             |
| `cpf`            | String | obrigatório, **único**, 11 dígitos (`/^\d{11}$/`)|
| `dataNascimento` | Date   | obrigatório                                     |
| `email`          | String | obrigatório, **único**, `lowercase`, `trim`     |
| `senha`          | String | obrigatório, armazenada com **hash bcrypt**     |
| `createdAt`/`updatedAt` | Date | gerados via `timestamps: true`            |

**Exemplo de documento:**
```json
{
  "_id": "665f1a2b3c4d5e6f7a8b9c0d",
  "nome": "Maria",
  "cpf": "12345678900",
  "dataNascimento": "2000-05-20T00:00:00.000Z",
  "email": "maria@email.com",
  "senha": "$2a$10$....(hash)....",
  "createdAt": "2026-06-11T12:00:00.000Z",
  "updatedAt": "2026-06-11T12:00:00.000Z"
}
```

## Coleção `tasks`

Schema definido em `src/models/Task.js`.

| Campo     | Tipo     | Regras                                                       |
|-----------|----------|--------------------------------------------------------------|
| `title`   | String   | obrigatório, `trim`                                          |
| `desc`    | String   | opcional, `trim`                                             |
| `date`    | Date     | obrigatório                                                  |
| `time`    | String   | obrigatório (ex.: `"14:30"`)                                 |
| `status`  | String   | enum `['Em andamento', 'Concluído', 'Atrasado']`, default `Em andamento` |
| `usuario` | ObjectId | **referência** ao `User` dono (obrigatório)                  |
| `createdAt`/`updatedAt` | Date | gerados via `timestamps: true`                  |

**Exemplo de documento:**
```json
{
  "_id": "665f1b9c2a1e4f0011223344",
  "title": "Estudar React",
  "desc": "Revisar hooks",
  "date": "2026-06-20T00:00:00.000Z",
  "time": "14:30",
  "status": "Em andamento",
  "usuario": "665f1a2b3c4d5e6f7a8b9c0d",
  "createdAt": "2026-06-12T09:00:00.000Z",
  "updatedAt": "2026-06-12T09:00:00.000Z"
}
```

## Índices e relações

- **Índices únicos:** `email` e `cpf` (criados automaticamente pelo `unique: true`).
- **Relação:** `tasks.usuario` → `users._id` (1 usuário : N tarefas). As consultas de tarefas sempre filtram por `usuario`, garantindo isolamento dos dados por usuário.
