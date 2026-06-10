# Instalação do Backend

Siga os passos abaixo para configurar e executar o servidor do Taskly localmente.

## Pré-requisitos
- Node.js instalado
- Docker instalado (para o banco de dados)

## Passo 1: Instalar Dependências
No diretório raiz do projeto, execute:
```bash
npm install
```

## Passo 2: Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto com base no exemplo disponível:
```bash
cp .env.example .env
```
Certifique-se de configurar as seguintes variáveis:
- `PORT`: Porta do servidor (default: 3000)
- `MONGODB_URI`: URI de conexão do MongoDB
- `JWT_SECRET`: Chave secreta para geração de tokens

## Passo 3: Banco de Dados (Docker)
Para subir uma instância local do MongoDB via Docker, utilize o comando:
```bash
docker run -d -p 27017:27017 --name mongodb-taskly mongo
```

## Passo 4: Executar o Servidor
Para iniciar o servidor em modo de desenvolvimento (com auto-reload):
```bash
npm run dev
```
O servidor estará disponível em `http://localhost:3000`.
