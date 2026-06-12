# Estrutura — Front-end

Organização da pasta `src/`. Cada componente/página fica em sua própria pasta com `index.jsx` (lógica/JSX) e `styles.css` (estilo).

```bash
frontend/
├── public/                # Arquivos estáticos (logo.svg)
├── index.html             # HTML raiz (Vite)
├── vite.config.js
├── eslint.config.js
└── src/
    ├── api.js             # Instância do Axios (baseURL + interceptors de token)
    ├── main.jsx           # Bootstrap do React + BrowserRouter
    ├── App.jsx            # Renderiza as rotas
    ├── index.css          # Estilos globais (fonte Inter, reset, cores base)
    │
    ├── assets/
    │   └── images/        # Ilustrações (welcome.svg, noTasks.svg)
    │
    ├── components/         # Componentes reutilizáveis
    │   ├── Button/
    │   │   ├── index.jsx
    │   │   └── styles.css
    │   ├── Input/
    │   ├── Header/
    │   ├── NavButton/
    │   ├── BackButton/
    │   ├── MobileMenu/
    │   ├── TaskCard/
    │   ├── EditTaskModal/
    │   ├── DeleteModal/
    │   └── FilterModal/
    │
    ├── hooks/              # Hooks personalizados
    │   ├── useForm.jsx     # Estado/validação genérica de formulários
    │   └── useTasks.jsx    # Carregamento, filtro, edição e exclusão de tarefas
    │
    ├── pages/              # Telas da aplicação
    │   ├── Welcome/
    │   ├── Login/
    │   ├── Register/
    │   ├── Tasks/
    │   ├── NewTask/
    │   └── Profile/
    │
    ├── routes/
    │   ├── index.jsx         # Definição das rotas (públicas e privadas)
    │   └── ProtectedRoute.jsx# Redireciona para /login sem token
    │
    └── utils/
        ├── formatters.js   # formatCpf, formatDate
        ├── validations.js  # validateEmail, validateCpf, validateName...
        ├── status.js       # TASK_STATUS, STATUS_OPTIONS, EDITABLE_STATUS_OPTIONS, STATUS_COLORS
        └── errors.js       # Mensagens de erro padronizadas
```

## Padrão de pasta de componente

```bash
components/
└── TaskCard/
    ├── index.jsx      # export function TaskCard(...) { ... }
    └── styles.css     # estilos do componente
```

## Páginas e rotas

| Rota          | Página     | Acesso    |
|---------------|------------|-----------|
| `/`           | Welcome    | público   |
| `/login`      | Login      | público   |
| `/register`   | Register   | público   |
| `/tasks`      | Tasks      | privado 🔒 |
| `/new-task`   | NewTask    | privado 🔒 |
| `/profile`    | Profile    | privado 🔒 |

🔒 = protegida por `ProtectedRoute` (exige token no `localStorage`).
