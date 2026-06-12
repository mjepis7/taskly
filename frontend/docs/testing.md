# Testes — Front-end

## Status atual

⚠️ O projeto **ainda não possui testes automatizados** configurados. Não há script `test` no `package.json` do front nem dependências de teste instaladas.

Esta página documenta a abordagem recomendada para quando os testes forem adicionados.

## Configuração recomendada

Para um projeto **React + Vite**, a stack usual é **Vitest** + **React Testing Library**:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Adicione os scripts ao `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Como rodar (após configurado)

```bash
npm run test            # roda os testes em modo watch
npm run test:coverage   # roda uma vez e gera relatório de cobertura
```

## Convenções

- Arquivos de teste ao lado do componente, no padrão `*.test.jsx` ou `*.spec.jsx`
  (ex.: `components/Button/Button.test.jsx`).
- Priorizar testes de:
  - **Utils puros** (`formatCpf`, `formatDate`, `validateEmail`, `getEffectiveStatus`) — fáceis e de alto valor.
  - **Hooks** (`useForm`, `useTasks`) com `renderHook`.
  - **Componentes** com interações (modais, formulários).

> O guia de documentação cita `*.spec.tsx`; como o projeto é em JavaScript, use a extensão `.jsx`.