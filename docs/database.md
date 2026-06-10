# Banco de Dados

A aplicação utiliza o MongoDB como banco de dados NoSQL, com o Mongoose para modelagem de dados.

## Coleções

### Users (Coleção: `users`)
Armazena as informações dos usuários cadastrados.

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `name` | String | Sim | Nome completo do usuário. |
| `cpf` | String | Sim | CPF (único). Salvo apenas números. |
| `birthDate` | Date | Sim | Data de nascimento. |
| `email` | String | Sim | E-mail (único, lowercase). |
| `password` | String | Sim | Hash da senha (Bcrypt). |
| `createdAt` | Date | Automático | Data de criação do registro. |
| `updatedAt` | Date | Automático | Data da última atualização. |

### Tasks (Coleção: `tasks`)
Armazena as tarefas vinculadas a cada usuário.

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `userId` | ObjectId | Sim | Referência ao usuário proprietário (`User`). |
| `title` | String | Sim | Título da tarefa. |
| `desc` | String | Sim | Descrição detalhada. |
| `date` | String | Sim | Data da tarefa. |
| `time` | String | Sim | Horário da tarefa. |
| `status` | String | Sim | Enum: `['Em andamento', 'Concluído', 'Atrasado']`. Default: `Em andamento`. |
| `createdAt` | Date | Automático | Data de criação do registro. |
| `updatedAt` | Date | Automático | Data da última atualização. |
