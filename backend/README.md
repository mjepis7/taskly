# Taskly — Backend 📋

API REST do Taskly, um aplicativo de gerenciamento de tarefas. Construída com Node.js, Express e MongoDB, oferece autenticação de usuários via JWT e gerenciamento de tarefas por usuário.

Desenvolvido durante o programa trainee da ICMC Jr. 🚀

## Funcionalidades 🧩

### Autenticação 🔐
- Cadastro de usuário (senha criptografada com bcrypt)
- Login com JWT (token válido por 1 dia)
- Consulta, atualização e exclusão da própria conta
- Middleware de autenticação protegendo as rotas privadas

### Tarefas 📋
- Criar, listar, editar e deletar tarefas
- Cada usuário acessa e gerencia apenas as próprias tarefas
- Status disponível: `Em andamento` e `Concluído`
  > O status `Atrasado` é **derivado no frontend** a partir da data/hora da tarefa e não é persistido pela API.

## Tecnologias utilizadas ⚙️

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv
- nodemon (desenvolvimento)

## Estrutura do projeto 📁

```bash
backend/
├── src/
│   ├── controllers/    # Lógica das rotas (authController, taskController)
│   ├── models/         # Schemas do MongoDB (User, Task)
│   ├── routes/         # Rotas da API (auth, task, user)
│   ├── middlewares/    # Middlewares (authMiddleware)
│   └── server.js       # Ponto de entrada do servidor
├── .env.example        # Exemplo de variáveis de ambiente
└── package.json
```

## Endpoints da API 🔌

Base: `http://localhost:3000`

### Autenticação — `/api/auth` (públicas)
| Método | Rota             | Descrição                              |
|--------|------------------|----------------------------------------|
| POST   | `/register`      | Cadastra um novo usuário               |
| POST   | `/login`         | Autentica e retorna `token` + `user`   |

### Usuário — `/api/user` (protegidas)
| Método | Rota   | Descrição                          |
|--------|--------|------------------------------------|
| GET    | `/me`  | Dados do usuário logado            |
| PUT    | `/me`  | Atualiza o perfil do usuário       |
| DELETE | `/me`  | Exclui a conta do usuário          |

### Tarefas — `/api/tasks` (protegidas)
| Método | Rota    | Descrição                          |
|--------|---------|------------------------------------|
| GET    | `/`     | Lista as tarefas do usuário logado |
| POST   | `/`     | Cria uma nova tarefa               |
| PUT    | `/:id`  | Atualiza uma tarefa                |
| DELETE | `/:id`  | Remove uma tarefa                  |

> As rotas protegidas exigem o header `Authorization: Bearer <token>`.

## Como rodar o projeto localmente 💻

Certifique-se de ter o **MongoDB** rodando (localmente ou via Atlas) e o **Node.js** instalado.

#### 1. Entrar na pasta backend
```bash
cd backend
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Criar arquivo .env
Crie um arquivo `.env` dentro da pasta `backend/` (use o `.env.example` como base):
```bash
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_segredo_super_secreto
PORT=3000
```

#### 4. Rodar o servidor
```bash
# produção
npm start

# desenvolvimento (reload automático com nodemon)
npm run dev
```

#### Backend roda em:
```bash
http://localhost:3000
```