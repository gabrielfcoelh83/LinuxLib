# LinuxLib Pro — Contexto UI

> Arquivo de contexto para conversas futuras focadas em interface e front-end.
> Para DevOps, use um arquivo separado (ex: `linux-devops.md`).

---

## O projeto

**LinuxLib Pro** é uma biblioteca de referência de comandos Linux construída como projeto de validação de um curso de desenvolvimento web (aulas 1–6). Hospedado via GitHub Pages.

- **URL ao vivo:** `https://gabrielfcoelh83.github.io/LinuxLib/`
- **Repositório:** `https://github.com/gabrielfcoelh83/LinuxLib`
- **Branch principal de trabalho:** `gabrielfcoelh83-main` (as mudanças são mergeadas em `main` para acionar o deploy)

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 |
| Linguagem | TypeScript 5.6 |
| Estilização | Tailwind CSS 4 |
| Bundler | Vite 7 |
| Componentes UI | shadcn/ui (Radix UI) |
| Roteamento | Wouter 3 com `useHashLocation` (hash routing para GitHub Pages) |
| Ícones | Lucide React |
| Notificações | Sonner |
| Gerenciador de pacotes | pnpm 10.4.1 |

---

## Arquitetura

```
LinuxLib/
├── .github/workflows/deploy.yml   # CI/CD → build Vite + deploy GitHub Pages
├── .gitignore
├── linuxlib-pro/                  # raiz do projeto Vite
│   ├── client/
│   │   ├── index.html             # lang=pt-BR, meta SEO, Google Fonts
│   │   └── src/
│   │       ├── App.tsx            # providers + Router (hash location)
│   │       ├── index.css          # design tokens CSS vars, fontes
│   │       ├── components/
│   │       │   ├── CategoryFilter.tsx   # aside > nav > ul/li + aria-pressed
│   │       │   ├── CommandCard.tsx      # article + header + footer + <pre><code>
│   │       │   ├── Header.tsx           # sticky header + busca + botão atalhos
│   │       │   ├── SearchBar.tsx        # form[role=search] + label + ref prop
│   │       │   └── ShortcutsHelp.tsx    # Dialog com tabela de atalhos <kbd>
│   │       ├── data/
│   │       │   └── commands.ts    # 33 comandos, 7 categorias (tipados)
│   │       ├── hooks/
│   │       │   └── useKeyboardShortcuts.ts  # hook global de atalhos de teclado
│   │       └── pages/
│   │           ├── Landing.tsx    # página "/" — hero, stats, features, CTA
│   │           ├── Home.tsx       # página "/app" — biblioteca com filtros
│   │           └── NotFound.tsx   # 404 em português
│   ├── server/index.ts            # Express serve SPA (apenas local/produção sem GitHub Pages)
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── vite.config.ts             # base: '/LinuxLib/', aliases @, @shared, @assets
```

---

## Design system

### Fontes (Google Fonts)
| Uso | Família |
|-----|---------|
| Headings (h1–h6) | **Syne** — distinto, editorial |
| Body | **Plus Jakarta Sans** |
| Código / terminal | **JetBrains Mono** |

> Space Grotesk e Inter foram **removidos** intencionalmente — são considerados genéricos pelo guia de design do projeto.

### Paleta (CSS vars em `index.css`)

**Dark (padrão):**
- Background: `#0a0910`
- Card: `#131120`
- Primary: `#a78bfa` (violeta claro)
- Border: `#2a2740`

**Light:**
- Background: `#f0eef8` (off-white lavanda)
- Primary: `#5b21b6` (violeta escuro)

### Tema padrão
`defaultTheme="dark"` no `ThemeProvider` — coerente com estética terminal.

---

## Roteamento

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `#/` | `Landing` | Landing page com hero e CTA |
| `#/app` | `Home` | Biblioteca de comandos |
| `#/404` | `NotFound` | Página 404 |
| `*` | `NotFound` | Fallback |

Hash routing (`#/`) necessário para GitHub Pages (sem servidor).

---

## Atalhos de teclado implementados

| Tecla | Ação | Funciona em input? |
|-------|------|--------------------|
| `/` | Focar a barra de busca | Não |
| `Esc` | Limpar busca + blur | **Sim** |
| `1–7` | Trocar categoria (ordem da array `categories`) | Não |
| `?` | Abrir/fechar painel de atalhos | Não |

Hook: `useKeyboardShortcuts(map, enabled?)` em `hooks/useKeyboardShortcuts.ts`.

---

## Semântica HTML aplicada

- `SearchBar`: `<form role="search">`, `<label htmlFor>`, `aria-label` no botão limpar, `aria-keyshortcuts="/"`
- `CommandCard`: `<article>` + `<header>` + `<footer>`, `<pre><code>` para o exemplo, link real para ExplainShell
- `CategoryFilter`: `<aside>` > `<nav aria-label>` > `<ul>/<li>`, `aria-pressed` em cada botão
- `Home`: `<section aria-labelledby>`, `aria-live` na contagem, `role="status"` no estado vazio
- `Landing`: landmarks completos — `<header>`, `<main>`, `<section>` com `aria-labelledby`, `<footer>`

---

## O que foi removido (scaffolding Manus AI)

- `ManusDialog.tsx` — diálogo de login Manus
- `Map.tsx` — integração Google Maps sem relação com o projeto
- Plugins Vite: `vitePluginManusDebugCollector`, `vitePluginStorageProxy`, `vitePluginManusRuntime`
- Dependências: `vite-plugin-manus-runtime`, `@builder.io/vite-plugin-jsx-loc`, `@types/google.maps`
- Script Umami analytics com variáveis `%VITE_ANALYTICS_*%` do Manus
- `patchedDependencies` para `wouter@3.7.1` (patch do Manus, incompatível com versão real instalada)

---

## Convenções do projeto

- Sem comentários desnecessários no código
- Sem `any` — TypeScript estrito
- Componentes de página em `pages/`, reutilizáveis em `components/`
- Dados estáticos em `data/commands.ts` — adicionar novos comandos apenas aqui
- Ícones sempre com `aria-hidden="true"` quando decorativos
- Links externos com `target="_blank" rel="noopener noreferrer"`

---

## Próximas melhorias de UI sugeridas

- Adicionar mais comandos ao `commands.ts` (atualmente 33, meta: 50+)
- Filtro por dificuldade (básico / intermediário / avançado)
- Modo de estudo (flash cards de comandos)
- Favoritos com `localStorage`
- Testes unitários com Vitest para a lógica de filtro do `Home.tsx`
