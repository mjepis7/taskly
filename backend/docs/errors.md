# Tratamento de erros

## Formato padrão

A API retorna erros como um objeto JSON com a chave `erro`:

```json
{ "erro": "Mensagem descritiva do erro" }
```

> O guia de documentação sugere o formato `{ "error": "...", "message": "..." }`. A implementação atual usa `{ "erro": "..." }` (em português, chave única). Padronizar para `{ error, message }` é uma possível evolução — se feito, atualize esta página e os controllers.

## Códigos de status usados

| Status | Significado            | Exemplos de uso                                                |
|--------|------------------------|----------------------------------------------------------------|
| `400`  | Requisição inválida    | E-mail/CPF já cadastrado; e-mail ou senha incorretos no login  |
| `401`  | Não autenticado/autorizado | Token ausente, inválido ou expirado; tarefa de outro usuário |
| `404`  | Não encontrado         | Usuário, tarefa ou rota inexistente                            |
| `500`  | Erro interno           | Falhas inesperadas (ex.: erro de conexão com o banco)          |

## Exemplos

**401 — sem token:**
```json
{ "erro": "Acesso negado. Faça login para continuar." }
```

**401 — token inválido/expirado:**
```json
{ "erro": "Token inválido ou expirado." }
```

**400 — cadastro duplicado:**
```json
{ "erro": "E-mail ou CPF já cadastrado." }
```

**404 — tarefa inexistente:**
```json
{ "erro": "Tarefa não encontrada." }
```

**500 — erro interno:**
```json
{ "erro": "Erro interno do servidor" }
```

## Observações
- Conflitos de índice único do MongoDB (código `11000`) são convertidos em `400` com mensagem amigável.
- Senhas **nunca** são retornadas (o campo `senha` é removido com `.select('-senha')`).
- No front-end, uma resposta `401` dispara logout automático e redirecionamento para `/login` (interceptor em `src/api.js`).