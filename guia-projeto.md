# LinuxLib Pro - Guia do Projeto

Este arquivo resume o projeto, como validá-lo e onde olhar no código para aprender com ele.

## O que foi feito

O LinuxLib Pro foi reorganizado para funcionar como uma aplicação moderna em React + Vite, com deploy no GitHub Pages. O objetivo principal é entregar uma biblioteca de comandos Linux com busca, filtros, cards e explicações, usando uma interface consistente e fácil de estudar.

Mudanças importantes:

- O app React é a interface principal do projeto.
- O deploy do GitHub Pages publica o build de `linuxlib-pro`.
- O repositório ficou focado no que realmente é usado.

## Como validar

### Rodar localmente

```bash
cd linuxlib-pro
npm install
npm run dev
```

Depois, abra a URL mostrada pelo Vite, normalmente `http://localhost:3000`.

### Checagens úteis

```bash
cd linuxlib-pro
npm run build
npm run check
```

O que cada uma faz:

- `npm run dev`: sobe o ambiente de desenvolvimento com hot reload.
- `npm run build`: gera o build de produção em `linuxlib-pro/dist/public`.
- `npm run check`: roda o TypeScript sem gerar arquivos.

### O que observar na validação

- Se a página carrega sem erro de rota.
- Se os comandos aparecem nos cards.
- Se a busca filtra os resultados.
- Se o filtro por categoria responde.
- Se o build termina sem erros.

## Como o front funciona

O front é o pedaço que o usuário vê e interage. Aqui ele está montado com React, Tailwind CSS e componentes reutilizáveis.

### Entrada da aplicação

A aplicação começa em [linuxlib-pro/client/src/main.tsx](linuxlib-pro/client/src/main.tsx). Esse arquivo monta o React dentro do elemento `root` e importa os estilos globais de [linuxlib-pro/client/src/index.css](linuxlib-pro/client/src/index.css).

### Roteamento

Em [linuxlib-pro/client/src/App.tsx](linuxlib-pro/client/src/App.tsx), o app usa `wouter` com `useHashLocation`. Isso é importante para GitHub Pages porque a navegação por hash evita problemas de refresh em rotas estáticas.

### Página principal

A tela principal está em [linuxlib-pro/client/src/pages/Home.tsx](linuxlib-pro/client/src/pages/Home.tsx). É aqui que normalmente ficam:

- o estado da busca;
- o estado da categoria selecionada;
- o filtro da lista;
- a renderização dos cards.

### Componentes principais

- [linuxlib-pro/client/src/components/Header.tsx](linuxlib-pro/client/src/components/Header.tsx): topo da página com identidade visual e busca.
- [linuxlib-pro/client/src/components/CategoryFilter.tsx](linuxlib-pro/client/src/components/CategoryFilter.tsx): botões de categoria.
- [linuxlib-pro/client/src/components/CommandCard.tsx](linuxlib-pro/client/src/components/CommandCard.tsx): cada card de comando.
- [linuxlib-pro/client/src/components/SearchBar.tsx](linuxlib-pro/client/src/components/SearchBar.tsx): campo de busca reutilizável.
- [linuxlib-pro/client/src/components/ErrorBoundary.tsx](linuxlib-pro/client/src/components/ErrorBoundary.tsx): proteção para falhas de renderização.

### Dados

A base de comandos fica em [linuxlib-pro/client/src/data/commands.ts](linuxlib-pro/client/src/data/commands.ts). Esse arquivo é o coração do conteúdo do projeto.

Se você quiser aprender bem, estude este fluxo:

1. os dados nascem em `commands.ts`;
2. `Home.tsx` filtra os dados;
3. `CategoryFilter.tsx` e `SearchBar.tsx` alteram o estado;
4. `CommandCard.tsx` desenha o resultado final.

### Estilo visual

O tema geral está em [linuxlib-pro/client/src/index.css](linuxlib-pro/client/src/index.css). Esse arquivo define:

- cores do tema claro e escuro;
- tipografia;
- espaçamento;
- comportamento responsivo;
- estilos base para a interface.

Se o visual parecer estranho, normalmente vale conferir este arquivo primeiro.

## Como o git entra no projeto

O Git é o sistema que guarda o histórico das mudanças. Neste projeto ele é importante por três motivos: versionamento, deploy e aprendizado.

### O que você fez com git aqui

- separou mudanças grandes em commits menores;
- publicou a branch principal no remoto;
- removeu `node_modules` do controle de versão;
- corrigiu o workflow de Pages;
- manteve o histórico do projeto legível.

### O que olhar para aprender

- `.github/workflows/deploy.yml`: mostra como o deploy é automatizado.
- `git log`: mostra a sequência do que foi feito.
- `git status`: mostra o estado atual do trabalho.
- `git diff`: mostra exatamente o que mudou.

### Fluxo mental simples de git

- `status` responde: o que mudou?
- `diff` responde: o que exatamente mudou?
- `add` responde: o que vai para o próximo commit?
- `commit` responde: qual foi a intenção da mudança?
- `push` responde: o que foi publicado no remoto?

### Boas práticas que este projeto já mostra

- commits com intenção clara;
- remoção de arquivos gerados ou pesados do versionamento;
- workflow automatizado para deploy;
- separação entre código-fonte e artefatos de build.

### O que foi removido

- A página estática antiga da raiz.
- O CSS e o JavaScript legados do site antigo.
- O partial HTML usado pela versão antiga.

Isso deixa o repositório alinhado com o app que realmente é publicado.

## Arquitetura do projeto

A arquitetura é dividida em camadas para deixar o projeto fácil de entender.

### Estrutura principal

```text
LinuxLib/
├── .github/workflows/      # Deploy do GitHub Pages
└── linuxlib-pro/           # Aplicação React/Vite principal
    ├── client/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── data/
    │   │   ├── pages/
    │   │   ├── App.tsx
    │   │   └── main.tsx
    │   └── index.html
    ├── server/
    ├── vite.config.ts
    └── package.json
```

### Responsabilidade de cada parte

- `client/src`: interface, componentes, páginas e estilos.
- `client/src/data`: conteúdo da aplicação.
- `server`: suporte para build ou futura API.
- `vite.config.ts`: configura o root do app, aliases e build.
- `.github/workflows/deploy.yml`: automatiza o deploy.

### Por que isso importa

Essa separação ajuda você a pensar assim:

- `data` guarda o conteúdo;
- `components` desenham partes reutilizáveis;
- `pages` organizam a tela;
- `App.tsx` define a navegação;
- `vite.config.ts` define como o projeto é montado e publicado.

## Como o deploy funciona

O deploy agora publica o build do React/Vite.

Arquivo-chave: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

Fluxo do deploy:

1. o GitHub Actions faz checkout do código;
2. instala dependências dentro de `linuxlib-pro`;
3. roda `npm run build`;
4. publica `linuxlib-pro/dist/public` no GitHub Pages.

Isso garante que o site publicado seja o mesmo app que você vê localmente.

## Como aprender olhando o próprio código

### 1. Comece pelos dados

Leia [linuxlib-pro/client/src/data/commands.ts](linuxlib-pro/client/src/data/commands.ts) e responda:

- o que é um comando?
- quais campos ele tem?
- como ele está organizado por categoria?

### 2. Depois veja a tela principal

Leia [linuxlib-pro/client/src/pages/Home.tsx](linuxlib-pro/client/src/pages/Home.tsx) e observe:

- onde o estado vive;
- como a lista é filtrada;
- como os componentes recebem props.

### 3. Depois vá para os componentes

Leia [linuxlib-pro/client/src/components/CommandCard.tsx](linuxlib-pro/client/src/components/CommandCard.tsx) e compare com [linuxlib-pro/client/src/components/CategoryFilter.tsx](linuxlib-pro/client/src/components/CategoryFilter.tsx).

Pergunte a si mesmo:

- o que é reaproveitável?
- o que depende do estado?
- o que só renderiza visual?

### 4. Finalmente veja o estilo

Leia [linuxlib-pro/client/src/index.css](linuxlib-pro/client/src/index.css) e veja como o tema é construído com variáveis CSS e utilitários.

## Explicação prática do front

O front pode ser entendido em três blocos:

- estrutura: a página e os componentes;
- comportamento: estado, filtros e busca;
- visual: Tailwind e CSS global.

A ideia é simples:

- o usuário digita uma busca;
- o estado muda;
- a lista é filtrada;
- os cards são recalculados e renderizados.

Esse ciclo é o básico de quase qualquer app React.

## Explicação prática do git

O Git aqui não é só backup. Ele resolve três tarefas:

- organizar o trabalho em etapas;
- manter histórico do que foi alterado;
- permitir deploy automático.

Se quiser aprender de verdade, use este ciclo:

```bash
git status
git diff
git add .
git commit -m "mensagem clara"
git push
```

Pense em cada comando como uma pergunta:

- `status`: o que mudou?
- `diff`: como mudou?
- `add`: o que entra no próximo marco?
- `commit`: qual é a intenção?
- `push`: já posso publicar?

## O que vale estudar neste repositório

Se você quer aprender usando o próprio código, foque nestes arquivos:

- [linuxlib-pro/client/src/data/commands.ts](linuxlib-pro/client/src/data/commands.ts)
- [linuxlib-pro/client/src/pages/Home.tsx](linuxlib-pro/client/src/pages/Home.tsx)
- [linuxlib-pro/client/src/components/CommandCard.tsx](linuxlib-pro/client/src/components/CommandCard.tsx)
- [linuxlib-pro/client/src/components/CategoryFilter.tsx](linuxlib-pro/client/src/components/CategoryFilter.tsx)
- [linuxlib-pro/client/src/index.css](linuxlib-pro/client/src/index.css)
- [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- [linuxlib-pro/vite.config.ts](linuxlib-pro/vite.config.ts)

## Exercícios para fixar

1. Adicione um novo comando em `commands.ts` e veja como ele aparece na UI.
2. Mude uma cor em `index.css` e observe o efeito no app.
3. Crie uma nova categoria e conecte ela ao filtro.
4. Leia o workflow do Pages e explique com suas palavras como o deploy acontece.
5. Faça um commit pequeno só com uma mudança visual e compare o `git diff`.

## Resumo curto

- O front está no app React dentro de `linuxlib-pro`.
- O deploy do Pages publica o build desse app.
- `commands.ts` é a fonte de conteúdo.
- `Home.tsx` coordena estado e filtro.
- `CommandCard.tsx` e `CategoryFilter.tsx` constroem a interface.
- `index.css` define o tema.
- `deploy.yml` publica o build.

Se você estudar esses arquivos nessa ordem, você entende o projeto inteiro por dentro.
