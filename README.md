# Taskly 📋

Um aplicativo de gerenciamento de tarefas com **frontend em React + backend em Node.js (Express + MongoDB)**. O sistema permite criar, editar, filtrar e gerenciar tarefas com autenticação de usuários (JWT).


Desenvolvido durante o programa trainee da ICMC Jr. 🚀

## Protótipo no Figma 🎨

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/design/Txe953AxhH7ALnScyWS7jA/Projeto-EJ?node-id=0-1&t=lnUopxMDIJufC7iz-1).

## Status do projeto 🚧

- Frontend completo
- Backend completo
- Autenticação funcionando
- CRUD de tarefas funcionando

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
frontend/
backend/
docs/
```

## Como rodar o projeto localmente 💻

Pré-requisitos: Node.js instalado e MongoDB Atlas ou local.

### 1. Clonar o repositório
```bash
$ git clone https://github.com/mjepis7/taskly.git
```

### Backend

#### 2. Entrar na pasta backend
```bash
cd backend
```

#### 3. Instalar dependências
```bash
npm install
```

#### 4. Criar arquivo .env
Crie um arquivo .env dentro da pasta backend/
```bash
MONGO_URI=sua_chave_aqui
JWT_SECRET=seu_segredo_seguro_aqui
PORT=3000
```

#### 5. Rodar servidor
```bash
npm start
```

#### Backend roda em:
```bash
http://localhost:3000
```

### Frontend

#### 6. Entrar na pasta frontend
```bash
cd ../frontend
```

#### 7. Instalar dependências
```bash
npm install
```

#### 8. Rodar o projeto
```bash
npm run dev
```

#### Frontend roda em:
```bash
http://localhost:5173
```


