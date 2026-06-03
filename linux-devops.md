# LinuxLib Pro — Contexto DevOps

> Arquivo de contexto para conversas futuras focadas em infraestrutura, CI/CD e operações.
> Para UI e front-end, use `linux-ui.md`.

---

## O projeto

**LinuxLib Pro** é uma SPA React hospedada via GitHub Pages, sem backend em produção.

- **URL ao vivo:** `https://gabrielfcoelh83.github.io/LinuxLib/`
- **Repositório:** `https://github.com/gabrielfcoelh83/LinuxLib`
- **Branch de desenvolvimento:** `gabrielfcoelh83-main`
- **Branch de produção:** `main` (deploy automático ao receber push ou merge)

---

## CI/CD atual

### Arquivo: `.github/workflows/deploy.yml`

```yaml
on:
  push:
    branches: ["main", "gabrielfcoelh83-main"]
  workflow_dispatch:
```

**Fluxo completo:**

```
push para main/gabrielfcoelh83-main
        │
        ▼
  Job: build (ubuntu-latest)
    ├── actions/checkout@v4
    ├── pnpm/action-setup@v4  (versão 10.4.1)
    ├── actions/setup-node@v4  (Node 22, cache: pnpm)
    ├── pnpm install --frozen-lockfile  (cwd: linuxlib-pro/)
    ├── pnpm build  (vite build + esbuild server)
    └── actions/upload-pages-artifact@v3  (path: linuxlib-pro/dist/public)
        │
        ▼
  Job: deploy
    └── actions/deploy-pages@v4  → github-pages environment
```

**Duração média:** ~1 min (build) + ~15 seg (deploy)

---

## Histórico de problemas no CI e como foram resolvidos

| Problema | Causa | Solução aplicada |
|----------|-------|-----------------|
| `Setup Node` falhava | `pnpm-lock.yaml` ausente — `cache-dependency-path` apontava para arquivo inexistente | Gerado com `pnpm install` e commitado |
| Assets 404 no GitHub Pages | `vite.config.ts` sem `base: '/LinuxLib/'` — assets carregavam de `/` | Adicionado `base: '/LinuxLib/'` |
| Workflow não disparava | `deploy.yml` só escutava `main`, não `gabrielfcoelh83-main` | Adicionado `gabrielfcoelh83-main` nos triggers |
| `pnpm install` falhava | `patchedDependencies.wouter@3.7.1` no `package.json` — patch do Manus AI incompatível com versão instalada | Removido `patchedDependencies` do `package.json` |
| Site servia versão antiga | GitHub Pages executava workflow de sistema (`pages build and deployment`) a partir do `main` desatualizado | Merge de `gabrielfcoelh83-main` → `main` após cada ciclo de mudanças |

---

## Build

### Comando
```bash
cd linuxlib-pro
pnpm build
# Equivalente a:
# vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

### Saída
```
linuxlib-pro/dist/
├── public/        ← artefato enviado ao GitHub Pages
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].js
│   │   └── index-[hash].css
│   └── ...
└── index.js       ← servidor Express compilado (não usado no GitHub Pages)
```

### Configuração Vite (`linuxlib-pro/vite.config.ts`)
```ts
base: "/LinuxLib/"          // obrigatório para GitHub Pages
root: "client/"             // raiz de entrada do front-end
build.outDir: "dist/public" // saída dos assets compilados
```

---

## Gerenciamento de dependências

- **Gerenciador:** pnpm 10.4.1 (fixado via `packageManager` no `package.json`)
- **Lockfile:** `linuxlib-pro/pnpm-lock.yaml` — **deve ser commitado**
- **Node requerido:** 22+ (definido no `setup-node` do CI)

### Overrides no `package.json`
```json
"pnpm": {
  "overrides": {
    "tailwindcss>nanoid": "3.3.7"
  }
}
```
Motivo: Tailwind CSS 4 usa nanoid com versão que tem conflito de ESM. Override forçado para 3.3.7.

---

## Variáveis de ambiente

Atualmente **nenhuma variável de ambiente está em uso em produção**. O arquivo `.env` existe no gitignore mas não há `.env.example` documentado.

Variáveis que existiam (Manus AI, já removidas):
- `VITE_ANALYTICS_ENDPOINT` — endpoint Umami (removido)
- `VITE_ANALYTICS_WEBSITE_ID` — ID do site Umami (removido)
- `BUILT_IN_FORGE_API_URL` — backend Manus (removido)
- `BUILT_IN_FORGE_API_KEY` — chave Manus (removido)
- `VITE_FRONTEND_FORGE_API_KEY` — chave Google Maps via proxy Manus (removido)

---

## Infraestrutura atual

```
Desenvolvedor
    │  git push
    ▼
GitHub (repositório)
    │  trigger: push to main
    ▼
GitHub Actions (ubuntu-latest)
    │  pnpm install + vite build
    ▼
GitHub Pages
    │  serve static files
    ▼
https://gabrielfcoelh83.github.io/LinuxLib/
```

**Sem:**
- Servidor próprio
- Docker / containers
- CDN dedicada
- Banco de dados
- Backend real (o `server/index.ts` Express existe mas não é usado no deploy)
- Monitoramento / alertas
- Testes automatizados no CI

---

## Scripts disponíveis (`linuxlib-pro/package.json`)

| Script | Comando | Uso |
|--------|---------|-----|
| `dev` | `vite --host` | Desenvolvimento local (porta 3000) |
| `build` | `vite build + esbuild` | Build de produção |
| `start` | `NODE_ENV=production node dist/index.js` | Servidor Express em produção |
| `preview` | `vite preview --host` | Preview do build localmente |
| `check` | `tsc --noEmit` | Verificação de tipos TypeScript |
| `format` | `prettier --write .` | Formatação de código |

---

## Melhorias DevOps identificadas (backlog)

### Alta prioridade
- [x] **Testes no CI**: rodar `pnpm check` (TypeScript) no pipeline antes do build
- [x] **Lint no CI**: adicionar ESLint ao pipeline para bloquear código com erros
- [x] **`.env.example`**: documentar variáveis esperadas mesmo que vazias hoje

### Média prioridade
- [ ] **Dockerfile**: containerizar a aplicação para rodar localmente de forma isolada
- [ ] **`docker-compose.yml`**: orquestrar dev environment (app + futuros serviços)
- [ ] **Cache otimizado no CI**: aproveitar melhor o cache do pnpm entre runs
- [ ] **Dependabot**: ativar para atualização automática de dependências
- [ ] **Branch protection**: proteger `main` exigindo CI verde antes de merge

### Baixa prioridade
- [ ] **Monitoramento**: integrar Umami ou Plausible (analytics sem cookie, LGPD-friendly)
- [ ] **Lighthouse CI**: rodar auditoria de performance/acessibilidade no pipeline
- [ ] **Preview deployments**: deploy automático de PRs para URL temporária

---

## Fluxo de trabalho atual

```
1. Trabalho em: gabrielfcoelh83-main
2. push → CI roda em gabrielfcoelh83-main
3. Merge gabrielfcoelh83-main → main
4. push main → CI roda em main → deploy GitHub Pages
```

**Problema:** fluxo com merge manual. Idealmente `main` seria a branch de produção
com proteção de branch e PRs obrigatórios.

---

## Comandos úteis para DevOps local

```bash
# Instalar dependências
cd linuxlib-pro && pnpm install

# Build de produção
pnpm build

# Preview do build
pnpm preview

# Verificar tipos
pnpm check

# Ver o que seria deployado
ls linuxlib-pro/dist/public/
```
