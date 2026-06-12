# Instalação — Back-end

Setup local da API do Taskly.

## Pré-requisitos
- **Node.js** instalado.
- **MongoDB** rodando localmente ou uma string de conexão do **MongoDB Atlas**.

## Passos

```bash
git clone https://github.com/mjepis7/taskly.git
cd taskly/backend
cp .env.example .env   # crie e preencha as variáveis
npm install
npm run dev
```

A API sobe em `http://localhost:3000`. Em caso de sucesso na conexão, o console exibe:

```
MongoDB conectado com sucesso!
Servidor rodando na porta 3000
```

## Scripts disponíveis

| Comando         | Descrição                                        |
|-----------------|--------------------------------------------------|
| `npm start`     | Inicia o servidor (`node src/server.js`)         |
| `npm run dev`   | Inicia em desenvolvimento com reload (`nodemon`) |

## Variáveis de ambiente

Defina no arquivo `.env` (base em `.env.example`):

| Variável      | Descrição                                              | Exemplo                         |
|---------------|--------------------------------------------------------|---------------------------------|
| `MONGO_URI`   | String de conexão do MongoDB (local ou Atlas)          | `mongodb://localhost:27017/taskly` |
| `JWT_SECRET`  | Segredo usado para assinar os tokens JWT               | `umsegredobemforte`             |
| `PORT`        | Porta do servidor (opcional; padrão `3000`)            | `3000`                          |

## Configurar MongoDB local

1. Instale o MongoDB Community Server.
2. Inicie o serviço (`mongod`).
3. Use uma URI como `mongodb://localhost:27017/taskly` no `.env`.

> Alternativamente, crie um cluster gratuito no MongoDB Atlas e use a connection string fornecida.