import { Link } from "wouter";
import { Terminal, Search, Copy, Tag, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const terminalLines = [
  { prompt: true, text: "grep -rn 'erro' ./logs" },
  { prompt: false, text: "logs/app.log:42:  [FATAL] conexão recusada", dim: true },
  { prompt: true, text: "chmod 755 deploy.sh" },
  { prompt: false, text: "permissões atualizadas com sucesso", green: true },
  { prompt: true, text: "docker ps -a" },
  { prompt: false, text: "CONTAINER ID   IMAGE    STATUS", dim: true },
  { prompt: false, text: "a1b2c3d4e5f6   nginx    Up 2 hours", dim: true },
];

const features = [
  {
    icon: Search,
    title: "Busca em tempo real",
    description:
      "Filtre por nome, descrição ou exemplo do comando. Sem recarregar a página.",
  },
  {
    icon: Tag,
    title: "7 categorias precisas",
    description:
      "Sistema, Rede, Arquivos, Containers, Permissões e mais. Encontre o que precisa na primeira tentativa.",
  },
  {
    icon: Copy,
    title: "Copiar em um clique",
    description:
      "Todo exemplo está pronto para ser colado diretamente no seu terminal.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
        <nav
          aria-label="Navegação principal"
          className="container flex items-center justify-between py-4"
        >
          <a
            href="/"
            aria-label="LinuxLib Pro — página inicial"
            className="flex items-center gap-2.5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Terminal className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
            </span>
            <span className="font-syne text-lg font-bold text-foreground">
              LinuxLib Pro
            </span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gabrielfcoelh83/LinuxLib"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            <Link href="/app">
              <Button size="sm" className="gap-1.5">
                Entrar
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section aria-labelledby="hero-heading" className="container py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text column */}
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <Terminal className="h-3 w-3 text-primary" aria-hidden="true" />
                Linux · Comandos · Referência
              </span>

              <h1
                id="hero-heading"
                className="text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-6xl"
              >
                Menos Google.{" "}
                <span className="text-primary">Mais Terminal.</span>
              </h1>

              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                33 comandos Linux essenciais organizados por categoria,
                pesquisáveis e com exemplos prontos para copiar.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/app">
                  <Button size="lg" className="gap-2 text-base">
                    Explorar biblioteca
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Gratuito · Sem login · Sem anúncios
                </p>
              </div>
            </div>

            {/* Terminal window preview */}
            <div
              className="w-full overflow-hidden rounded-xl border border-border bg-slate-950 shadow-2xl shadow-primary/10"
              role="img"
              aria-label="Prévia da interface de linha de comando do LinuxLib"
            >
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/60" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" aria-hidden="true" />
                <span className="ml-3 font-mono text-xs text-slate-500">
                  bash — linuxlib-pro
                </span>
              </div>
              {/* Terminal body */}
              <div className="space-y-1.5 p-5 font-mono text-sm">
                {terminalLines.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.prompt
                        ? "text-emerald-400"
                        : line.green
                        ? "text-emerald-300"
                        : "text-slate-500"
                    }
                  >
                    {line.prompt && (
                      <span className="mr-2 text-primary" aria-hidden="true">$</span>
                    )}
                    {line.text}
                  </p>
                ))}
                <p className="animate-pulse text-primary" aria-hidden="true">▮</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section aria-label="Estatísticas da biblioteca" className="border-y border-border bg-card">
          <div className="container py-8">
            <dl className="grid grid-cols-3 divide-x divide-border text-center">
              <div className="px-4 py-2">
                <dt className="text-sm text-muted-foreground">Comandos</dt>
                <dd className="font-syne text-3xl font-extrabold tabular-nums text-primary">33</dd>
              </div>
              <div className="px-4 py-2">
                <dt className="text-sm text-muted-foreground">Categorias</dt>
                <dd className="font-syne text-3xl font-extrabold tabular-nums text-primary">7</dd>
              </div>
              <div className="px-4 py-2">
                <dt className="text-sm text-muted-foreground">Custo</dt>
                <dd className="font-syne text-3xl font-extrabold text-primary">R$0</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Features */}
        <section
          aria-labelledby="features-heading"
          className="container py-20 lg:py-24"
        >
          <header className="mb-12 text-center">
            <h2 id="features-heading" className="text-3xl font-extrabold lg:text-4xl">
              Tudo que você precisa.{" "}
              <span className="font-semibold text-muted-foreground">
                Nada que você não precisa.
              </span>
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3" role="list">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title}>
                  <article className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* CTA final */}
        <section
          aria-labelledby="cta-heading"
          className="border-t border-border bg-card"
        >
          <div className="container py-20 text-center lg:py-24">
            <h2
              id="cta-heading"
              className="mb-4 text-4xl font-extrabold leading-tight lg:text-5xl"
            >
              Domínio começa com{" "}
              <span className="text-primary">referência.</span>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-lg text-muted-foreground">
              Explore a biblioteca completa de comandos Linux.
            </p>
            <Link href="/app">
              <Button size="lg" className="gap-2 text-base">
                Acessar LinuxLib Pro
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-syne text-sm font-semibold">LinuxLib Pro</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 LinuxLib Pro. Desenvolvido com React e Tailwind CSS.
          </p>
          <nav aria-label="Links do rodapé" className="flex items-center gap-4">
            <a
              href="https://github.com/gabrielfcoelh83/LinuxLib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <Link
              href="/app"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Biblioteca
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
