# Taskly 📋

Esta é a interface do Taskly, um aplicativo de gerenciamento de tarefas. O frontend foi construído utilizando React e Vite, proporcionando uma experiência de usuário dinâmica, rápida e responsiva, totalmente integrada com uma API RESTful para autenticação e persistência de dados.

Desenvolvido durante o programa trainee da ICMC Jr. 🚀

## Protótipo no Figma 🎨

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/design/Txe953AxhH7ALnScyWS7jA/Projeto-EJ?node-id=0-1&t=lnUopxMDIJufC7iz-1).

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
    ├── assets/       # Imagens e estilos globais
    ├── components/   # Componentes reutilizáveis (Botões, Cards, Inputs)
    ├── hooks/        # Hooks personalizados (ex: useTasks e useForm)
    ├── pages/        # Telas da aplicação (Login, Tasks, Profile)
    ├── routes/       # Configuração de rotas privadas e públicas
    ├── utils/        # Funções auxiliares (ex: formatDate e validateEmail)
    ├── App.jsx
    └── main.jsx
```

## Como rodar o projeto localmente 💻

Para que o frontend funcione completamente, certifique-se de que a API do backend esteja rodando localmente (geralmente na porta 3000) ou que a URL base no serviço do Axios esteja apontando para o servidor correto.


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


