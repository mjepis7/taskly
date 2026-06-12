# Style Guide — Front-end

Referência visual e de uso dos componentes padronizados.

## Tipografia
- Fonte: **Inter** (importada via Google Fonts em `src/index.css`).
- Pesos usados: 400–700.

## Cores

### Base / layout
| Uso                | Hex        |
|--------------------|------------|
| Fundo da aplicação | `#0f172a`  |
| Texto sobre fundo  | `#f8fafc`  |
| Azul primário      | `#2940ff`  |
| Azul escuro (ícones)| `#101b7a` |
| Azul do filtro "Todos" | `#1d2f9d` |
| Texto secundário   | `#64748b` / `#888888` |

### Status das tarefas
Definidas em `src/utils/status.js` (`STATUS_COLORS`):

| Status         | Hex        |
|----------------|------------|
| Em andamento   | `#FFB800` 🟡 |
| Concluído      | `#10E196` 🟢 |
| Atrasado       | `#FF3366` 🔴 |

## Componentes padronizados

| Componente       | Uso                                                        |
|------------------|------------------------------------------------------------|
| `Button`         | Botão primário de ações (submit dos formulários)           |
| `Input`          | Campo de formulário com `label` e exibição de `error`      |
| `Header`         | Cabeçalho das telas internas (saudação, perfil, logout)    |
| `NavButton`      | Botão de navegação no header                               |
| `BackButton`     | Voltar para a tela anterior                                |
| `MobileMenu`     | Navegação inferior no mobile                               |
| `TaskCard`       | Card de tarefa (status colorido; concluída fica riscada)   |
| `EditTaskModal`  | Modal de edição de tarefa                                  |
| `DeleteModal`    | Modal de confirmação de exclusão (suporta estado `loading`)|
| `FilterModal`    | Modal de filtro por status                                 |

### Convenções de estado visual
- **Tarefa concluída:** card com `opacity: 0.7` e título/descrição com `line-through`.
- **Botão desabilitado:** `opacity: 0.5` + `cursor: not-allowed` (definido globalmente em `index.css`).
- **Status "Atrasado":** aplicado automaticamente quando a data/hora vence (apenas visual).

