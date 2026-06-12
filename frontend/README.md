# Taskly — Frontend 📋

Interface do Taskly, um aplicativo de gerenciamento de tarefas. Construída com React e Vite, com experiência responsiva e integrada à API REST do backend para autenticação e persistência de dados.

Desenvolvido durante o programa trainee da ICMC Jr. 🚀

## Protótipo no Figma 🎨

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/design/Txe953AxhH7ALnScyWS7jA/Projeto-EJ?node-id=0-1&t=lnUopxMDIJufC7iz-1).

## Funcionalidades 🧩

### Autenticação 🔐
- Cadastro de usuário com validação de campos (nome, CPF, data de nascimento, e-mail, senha)
- Login com JWT (token salvo no `localStorage`)
- Atualização de perfil e exclusão de conta
- Rotas protegidas: páginas internas redirecionam para o login sem sessão válida e a sessão é encerrada automaticamente em caso de token expirado (HTTP 401)

### Tarefas 📋
- Criar, editar e deletar tarefas
- Busca por título/descrição
- Filtro por status (Em andamento, Concluído, Atrasado)
- Status **"Atrasado" calculado automaticamente** quando a data/hora vence (apenas visual; o usuário controla só "Em andamento" e "Concluído")
- Tarefas concluídas com texto riscado e movidas para o final da lista
- Layout responsivo com menu inferior no mobile

## Tecnologias utilizadas ⚙️

- ReactJS
- Vite
- React Router DOM
- Axios
- Phosphor Icons
- JavaScript (ES6+)

## Estrutura do projeto 📁

```bash
frontend/
├── public/
└── src/
    ├── assets/       # Imagens e recursos estáticos
    ├── components/   # Componentes reutilizáveis (Button, TaskCard, Input, modais...)
    ├── hooks/        # Hooks personalizados (useTasks, useForm)
    ├── pages/        # Telas (Welcome, Login, Register, Tasks, NewTask, Profile)
    ├── routes/       # Rotas públicas e privadas (ProtectedRoute)
    ├── utils/        # Funções auxiliares (formatters, validations, status, errors)
    ├── api.js        # Instância do Axios (URL base + interceptors de token)
    ├── App.jsx
    └── main.jsx
```

## Scripts disponíveis 📜

```bash
npm run dev        # ambiente de desenvolvimento
npm run build      # build de produção
npm run preview    # pré-visualiza o build
npm run lint       # checa o código com ESLint
npm run lint:fix   # corrige problemas de lint automaticamente
```

## Como rodar o projeto localmente 💻

Para que o frontend funcione por completo, certifique-se de que a **API do backend** esteja rodando (por padrão em `http://localhost:3000`). A URL base da API fica em `src/api.js`.

#### 1. Entrar na pasta frontend
```bash
cd frontend
```

#### 2. Instalar dependências
```bash
npm install
```

#### 3. Rodar o projeto
```bash
npm run dev
```

#### Frontend roda em:
```bash
http://localhost:5173
```