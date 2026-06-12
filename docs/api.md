# Documentação da API - Taskly Backend

Esta documentação descreve os endpoints da API do Taskly, incluindo métodos, formatos de requisição e resposta.

**Base URL:** `http://localhost:3000`

---

## Autenticação

A maioria das rotas exige autenticação via JWT. O token deve ser enviado no header `Authorization` seguindo o formato:

```http
Authorization: Bearer <TOKEN>
```

---

## Endpoints de Autenticação (`/auth`)

### Registro de Usuário
Cria uma nova conta no sistema.

- **URL:** `/auth/register`
- **Método:** `POST`
- **Body:**
```json
{
  "name": "Nome do Usuário",
  "cpf": "123.456.789-00",
  "birthDate": "1990-01-01",
  "email": "usuario@exemplo.com",
  "password": "senha_segura"
}
```
- **Sucesso (210):**
```json
{
  "token": "<TOKEN>",
  "user": {
    "id": "ID_DO_USUARIO",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com"
  }
}
```

### Login
Autentica um usuário existente.

- **URL:** `/auth/login`
- **Método:** `POST`
- **Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha_segura"
}
```
- **Sucesso (200):**
```json
{
  "token": "<TOKEN>",
  "user": {
    "id": "ID_DO_USUARIO",
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com"
  }
}
```

---

## Endpoints de Perfil (`/profile`)
*Requer Autenticação*

### Obter Perfil
Retorna os dados do usuário autenticado.

- **URL:** `/profile`
- **Método:** `GET`
- **Sucesso (200):**
```json
{
  "_id": "ID_DO_USUARIO",
  "name": "Nome do Usuário",
  "cpf": "12345678900",
  "birthDate": "1990-01-01T00:00:00.000Z",
  "email": "usuario@exemplo.com",
  "createdAt": "2024-06-10T...",
  "updatedAt": "2024-06-10T..."
}
```

### Atualizar Perfil
Atualiza dados do usuário autenticado.

- **URL:** `/profile`
- **Método:** `PUT`
- **Body:** (campos opcionais)
```json
{
  "name": "Novo Nome",
  "cpf": "111.222.333-44",
  "birthDate": "1995-05-05",
  "email": "novo@email.com",
  "password": "nova_senha"
}
```
- **Sucesso (200):**
```json
{
  "id": "ID_DO_USUARIO",
  "name": "Novo Nome",
  "email": "novo@email.com"
}
```

### Deletar Perfil
Remove a conta e todas as tarefas associadas.

- **URL:** `/profile`
- **Método:** `DELETE`
- **Sucesso (200):**
```json
{
  "message": "Conta deletada com sucesso"
}
```

---

## Endpoints de Tarefas (`/tasks`)
*Requer Autenticação*

### Listar Tarefas
Retorna todas as tarefas do usuário autenticado.

- **URL:** `/tasks`
- **Método:** `GET`
- **Query Params:**
    - `search` (opcional): Busca por texto no título ou descrição.
    - `status` (opcional): Filtra por status (`Em andamento`, `Concluído`, `Atrasado`).
- **Sucesso (200):**
```json
[
  {
    "_id": "ID_DA_TAREFA",
    "userId": "ID_DO_USUARIO",
    "title": "Título",
    "desc": "Descrição",
    "date": "2024-06-10",
    "time": "14:00",
    "status": "Em andamento",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

### Criar Tarefa
Cria uma nova tarefa para o usuário autenticado.

- **URL:** `/tasks`
- **Método:** `POST`
- **Body:**
```json
{
  "title": "Minha Tarefa",
  "desc": "Detalhes da tarefa",
  "date": "2024-06-10",
  "time": "10:00",
  "status": "Em andamento"
}
```
- **Sucesso (201):**
```json
{
  "_id": "ID_DA_TAREFA",
  "userId": "ID_DO_USUARIO",
  "title": "Minha Tarefa",
  "desc": "Detalhes da tarefa",
  "date": "2024-06-10",
  "time": "10:00",
  "status": "Em andamento",
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Atualizar Tarefa
Atualiza uma tarefa existente por ID.

- **URL:** `/tasks/:id`
- **Método:** `PUT`
- **Body:** (campos opcionais)
```json
{
  "title": "Título Atualizado",
  "status": "Concluído"
}
```
- **Sucesso (200):**
```json
{
  "_id": "ID_DA_TAREFA",
  "status": "Concluído",
  "...": "..."
}
```

### Deletar Tarefa
Remove uma tarefa por ID.

- **URL:** `/tasks/:id`
- **Método:** `DELETE`
- **Sucesso (200):**
```json
{
  "message": "Tarefa deletada com sucesso"
}
```
