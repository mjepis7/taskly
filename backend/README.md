# Taskly 📋

Esta é a API do Taskly, um aplicativo de gerenciamento de tarefas. O backend foi construído utilizando Node.js, Express e MongoDB, fornecendo uma API RESTful completa para autenticação de usuários e gerenciamento de tarefas.

Desenvolvido durante o programa trainee da ICMC Jr. 🚀

## Funcionalidades 🧩

### Autenticação 🔐
- Cadastro de usuário
- Login com JWT
- Atualização de perfil
- Exclusão de conta

### Tarefas 📋
- Criar tarefas
- Editar tarefas
- Deletar tarefas
- Listar tarefas do usuário logado
- Filtro por status (Em andamento, Concluído, Atrasado)
- Busca por texto

## Tecnologias utilizadas ⚙️

- Node.js
- Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS
- dotenv

## Estrutura do projeto 📁

```bash
backend/
├── src/
│   ├── controllers/    # Lógica das rotas (auth, task)
│   ├── models/         # Schemas do MongoDB (User, Task)
│   ├── routes/         # Definição das rotas da API
│   ├── middleware/     # Middlewares (auth)
├── .env                # Variáveis de ambiente
├── server.js           # Ponto de entrada do servidor
```

## Como rodar o projeto localmente 💻

Certifique-se de ter o MongoDB rodando (localmente ou via Atlas) e o Node.js instalado.


#### 1. Entrar na pasta backend
```bash
cd backend
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Criar arquivo .env
Crie um arquivo .env dentro da pasta backend/
```bash
MONGO_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_segredo_super_secreto
PORT=3000
```

#### 4. Rodar o servidor
```bash
npm run dev
```

#### Backend roda em:
```bash
http://localhost:3000
```


