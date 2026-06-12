# API

Especificação dos endpoints, modelos de dados e exemplos de uso da API do Taskly.

- **Versão:** 1.0.0 (a API **não** usa prefixo de versão na URL — ex.: `/api/auth/login`, e não `/api/v1/...`)
- **Base URL (local):** `http://localhost:3000/api`
- **Formato:** JSON em requisições e respostas.

## Autenticação

A API usa **JWT (Bearer token)**. Após o login, envie o token no header de toda rota protegida:

```
Authorization: Bearer <token>
```

O token é gerado no login com validade de **1 dia**. As rotas de `/auth` são públicas; as de `/user` e `/tasks` são protegidas.

## Endpoints

### POST /api/auth/register
Cria um novo usuário.

**Request Body:**
```json
{
  "nome": "Maria",
  "cpf": "12345678900",
  "dataNascimento": "2000-05-20",
  "email": "maria@email.com",
  "senha": "12345678"
}
```

**Response 201:**
```json
{ "mensagem": "Usuário cadastrado com sucesso!" }
```

**Erros:** `400` se e-mail ou CPF já estiverem cadastrados.

---

### POST /api/auth/login
Autentica o usuário e retorna o token.

**Request Body:**
```json
{ "email": "maria@email.com", "senha": "12345678" }
```

**Response 200:**
```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "<jwt>",
  "user": { "id": "<id>", "nome": "Maria", "email": "maria@email.com" }
}
```

**Erros:** `400` se e-mail ou senha estiverem incorretos.

---

### GET /api/user/me 🔒
Retorna os dados do usuário logado (sem a senha).

**Response 200:**
```json
{
  "_id": "<id>",
  "nome": "Maria",
  "cpf": "12345678900",
  "dataNascimento": "2000-05-20T00:00:00.000Z",
  "email": "maria@email.com",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### PUT /api/user/me 🔒
Atualiza o perfil do usuário logado. Só os campos enviados são alterados.

**Request Body (exemplo):**
```json
{ "nome": "Maria Silva", "cpf": "123.456.789-00", "email": "maria.silva@email.com" }
```

**Response 200:** usuário atualizado (sem a senha).
**Erros:** `400` em conflito de e-mail/CPF, `404` se não encontrado.

---

### DELETE /api/user/me 🔒
Exclui a conta do usuário logado.

**Response 200:**
```json
{ "mensagem": "Conta deletada com sucesso" }
```

---

### GET /api/tasks 🔒
Lista as tarefas do usuário logado.

**Response 200:** array de `Task`.

---

### POST /api/tasks 🔒
Cria uma tarefa para o usuário logado.

**Request Body:**
```json
{
  "title": "Estudar React",
  "desc": "Revisar hooks",
  "date": "2026-06-20",
  "time": "14:30",
  "status": "Em andamento"
}
```

**Response 201:** a `Task` criada.

---

### PUT /api/tasks/:id 🔒
Atualiza uma tarefa do usuário logado.

**Response 200:** a `Task` atualizada.
**Erros:** `404` se não existir, `401` se a tarefa não for do usuário.

---

### DELETE /api/tasks/:id 🔒
Remove uma tarefa do usuário logado.

**Response 200:**
```json
{ "mensagem": "Tarefa removida com sucesso!" }
```
**Erros:** `404` se não existir, `401` se a tarefa não for do usuário.

## Modelos

### User
| Campo            | Tipo    | Observações                                  |
|------------------|---------|----------------------------------------------|
| `nome`           | String  | obrigatório                                  |
| `cpf`            | String  | obrigatório, único, 11 dígitos               |
| `dataNascimento` | Date    | obrigatório                                  |
| `email`          | String  | obrigatório, único, lowercase                |
| `senha`          | String  | obrigatório, armazenada com hash (bcrypt)    |
| `createdAt` / `updatedAt` | Date | gerados automaticamente (`timestamps`)  |

### Task
| Campo       | Tipo     | Observações                                            |
|-------------|----------|--------------------------------------------------------|
| `title`     | String   | obrigatório                                            |
| `desc`      | String   | opcional                                               |
| `date`      | Date     | obrigatório                                            |
| `time`      | String   | obrigatório (ex.: `"14:30"`)                           |
| `status`    | String   | `Em andamento` ou `Concluído` (`Atrasado` é derivado)  |
| `usuario`   | ObjectId | referência ao `User` dono                              |
| `createdAt` / `updatedAt` | Date | gerados automaticamente (`timestamps`)    |

## Códigos de erro

As respostas de erro seguem o formato `{ "erro": "mensagem" }`.

| Status | Quando ocorre                                              |
|--------|-----------------------------------------------------------|
| `400`  | Dados inválidos / e-mail ou CPF já cadastrado / login incorreto |
| `401`  | Token ausente, inválido ou recurso de outro usuário       |
| `404`  | Recurso (usuário, tarefa ou rota) não encontrado          |
| `500`  | Erro interno do servidor                                  |

Detalhes em [../backend/docs/errors.md](../backend/docs/errors.md).
