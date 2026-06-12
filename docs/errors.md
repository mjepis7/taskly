# Tratamento de Erros

A API utiliza códigos de status HTTP padrão e retorna mensagens de erro em um formato JSON consistente.

## Formato de Erro

Em caso de erro, a resposta seguirá o seguinte padrão:

```json
{
  "message": "Descrição amigável do erro",
  "error": "Detalhes técnicos (opcional)"
}
```

## Códigos de Status Mapeados

### 400 - Bad Request
Retornado quando há erros de validação ou campos obrigatórios ausentes.
- **Exemplo:** `{"message": "Preencha todos os campos"}`
- **Cenários:** Campos faltantes no registro, login ou criação de tarefas; e-mail ou CPF já cadastrados.

### 401 - Unauthorized
Retornado quando a autenticação falha ou não é fornecida.
- **Exemplo:** `{"message": "E-mail ou senha incorretos"}`
- **Exemplo:** `{"message": "Token não fornecido"}`
- **Exemplo:** `{"message": "Token inválido ou expirado"}`

### 404 - Not Found
Retornado quando um recurso solicitado não existe.
- **Exemplo:** `{"message": "Usuário não encontrado"}`
- **Exemplo:** `{"message": "Tarefa não encontrada"}`

### 500 - Internal Server Error
Retornado em casos de falhas inesperadas no servidor ou banco de dados.
- **Exemplo:** `{"message": "Erro ao buscar tarefas", "error": "..."}`
