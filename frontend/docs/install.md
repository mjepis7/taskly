# Instalação — Front-end

Passo a passo para rodar o front-end localmente.

## Pré-requisitos
- **Node.js** instalado.
- **Back-end rodando** (por padrão em `http://localhost:3000`) — o front consome a API.

## Passos

```bash
git clone https://github.com/mjepis7/taskly.git
cd taskly/frontend
npm install
npm run dev
```

O app abre em `http://localhost:5173`.

## Scripts disponíveis

| Comando            | Descrição                                  |
|--------------------|--------------------------------------------|
| `npm run dev`      | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build`    | Gera o build de produção                   |
| `npm run preview`  | Pré-visualiza o build localmente           |
| `npm run lint`     | Checa o código com ESLint                  |
| `npm run lint:fix` | Corrige problemas de lint automaticamente  |

## Variáveis de ambiente

O front-end **não usa arquivo `.env`** atualmente. A URL base da API é definida diretamente em `src/api.js`:

```js
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})
```
