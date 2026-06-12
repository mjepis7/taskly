# Handbook — Convenções e padrões de código

Padrões adotados no Taskly. O objetivo é manter o código consistente entre front e back.

## Naming

- **Diretórios:** em `lowercase` (`components/`, `hooks/`, `routes/`).
- **Componentes React:** uma pasta em `PascalCase` por componente, contendo `index.jsx` + `styles.css`
  (ex.: `components/TaskCard/index.jsx`, `components/TaskCard/styles.css`).
- **Hooks:** prefixo `use` em camelCase (`useForm`, `useTasks`) — arquivos `.jsx`.
- **Utilitários:** camelCase (`formatCpf`, `validateEmail`, `getEffectiveStatus`).
- **Constantes compartilhadas:** UPPER_SNAKE_CASE (`TASK_STATUS`, `STATUS_OPTIONS`).
- **Back-end:** controllers/rotas/models em camelCase; models exportados em `PascalCase` (`User`, `Task`).

> Observação: o código mistura termos em PT e EN (ex.: `usuario`/`nome` no back, `title`/`status` nas tarefas). Ao criar código novo, siga o padrão do arquivo que você está editando.

## Estilização

- **Front:** CSS puro, um `styles.css` por componente/página (sem Tailwind ou libs de UI).
  - Fonte global: **Inter** (importada em `index.css`).
  - Cores de status: `Em andamento` `#FFB800`, `Concluído` `#10E196`, `Atrasado` `#FF3366` (ver [styleguide](../frontend/docs/styleguide.md)).
- **Back:** JSON com indentação de 2 espaços; respostas de erro no formato `{ "erro": "mensagem" }`.

## Boas práticas

- **DRY:** centralize lógica reutilizável (ex.: instância única do Axios em `api.js`, status em `utils/status.js`).
- **Estado derivado:** valores calculáveis (como `Atrasado`) não devem ser persistidos nem duplicados no estado — derive na renderização.
- **Comentários:** explique o *porquê* de trechos não óbvios; evite comentar o óbvio.
- **Tratamento de erro:** sempre trate falhas de requisição e mostre mensagem amigável ao usuário.
- **Segurança:** nunca exponha a senha em respostas; rotas privadas sempre passam pelo `authMiddleware`.

## Ferramentas

- **ESLint:** configurado em `frontend/eslint.config.js`.
  - `npm run lint` para checar e `npm run lint:fix` para corrigir automaticamente.
  - Plugins: `react-hooks` e `react-refresh`.
- **Prettier / Commitlint / CI:** ainda **não configurados** neste projeto. Recomendação para evolução futura:
  - Adicionar Prettier para formatação automática.
  - Adotar **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`…) — já usados informalmente no histórico.
  - Rodar `lint` em CI antes do merge.