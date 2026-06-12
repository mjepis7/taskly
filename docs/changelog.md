# Changelog

Histórico de entregas do Taskly. As versões seguem [SemVer](https://semver.org/lang/pt-BR/).

## [v1.0.1] – 2026-06-12
### Ajustes de integração e correções
- Correção do filtro por status (incluindo "Atrasado") e da busca de tarefas.
- "Atrasado" passou a ser **derivado** (visual), sem ser gravado no banco; edição usa o status real.
- Correção da atualização de perfil (normalização do CPF).
- Rotas protegidas no front e logout automático em respostas `401`.
- UI: tarefas concluídas com texto riscado e movidas para o final da lista.
- Documentação (README de raiz, front e back) e pasta `docs/` revisadas.

## [v1.0.0] – 2026-06-11
### Lançamento — integração full-stack
- Integração completa Front-end ↔ Back-end.
- API REST com Express + MongoDB: autenticação (JWT) e CRUD de tarefas.
- Cadastro, login, perfil (atualizar/excluir) e gerenciamento de tarefas por usuário.

## [v0.2.0] – 2026-05-22
### Front-end
- Telas de Welcome e Login.
- Estrutura de páginas e estilos globais.

## [v0.1.0] – 2026-05-20
### Setup inicial
- Projeto inicializado com Vite.
- Organização da estrutura do front-end e configuração de Phosphor Icons.