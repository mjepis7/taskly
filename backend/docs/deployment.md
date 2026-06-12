# Deployment — Back-end

⚠️ O projeto **ainda não possui configuração de deploy** (sem Dockerfile, sem CI/CD). Esta página descreve as variáveis necessárias e um caminho recomendado para subir a API.

## Pré-requisitos para produção
- Banco **MongoDB Atlas** (recomendado em produção) com a connection string.
- Variáveis de ambiente configuradas no provedor (ver abaixo).

## Variáveis de ambiente

| Variável     | Obrigatória | Descrição                                  |
|--------------|-------------|--------------------------------------------|
| `MONGO_URI`  | sim         | Connection string do MongoDB (Atlas)       |
| `JWT_SECRET` | sim         | Segredo forte para assinar os JWTs         |
| `PORT`       | não         | Porta (provedores costumam injetar a deles) |

## Comandos

```bash
npm install --production   # instala dependências
npm start                  # inicia o servidor (node src/server.js)
```

> O servidor lê `process.env.PORT` e usa `3000` como fallback — compatível com plataformas que definem a porta automaticamente.

## Opções de hospedagem

### Render / Railway / Heroku (mais simples)
1. Conecte o repositório.
2. Defina o diretório raiz como `backend/`.
3. Build command: `npm install` · Start command: `npm start`.
4. Configure as variáveis de ambiente no painel.

### Docker (exemplo de evolução)
Não há `Dockerfile` no projeto. Um exemplo mínimo seria:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Checklist antes de publicar
- [ ] `JWT_SECRET` forte e fora do versionamento (`.env` está no `.gitignore`).
- [ ] CORS apontando para a origem do front em produção (atualizar `origin` em `src/server.js`, hoje fixo em `http://localhost:5173`).
- [ ] `MONGO_URI` de produção (Atlas), não a local.