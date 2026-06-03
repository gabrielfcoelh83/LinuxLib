import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "wouter";
import CategoryFilter from "@/components/CategoryFilter";
import CommandCard from "@/components/CommandCard";
import Header from "@/components/Header";
import ShortcutsHelp from "@/components/ShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { categories, commands } from "@/data/commands";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredCommands = useMemo(() => {
    return commands.filter((command) => {
      const q = searchValue.toLowerCase();
      const matchesSearch =
        command.name.toLowerCase().includes(q) ||
        command.description.toLowerCase().includes(q) ||
        command.example.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "all" || command.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchValue, selectedCategory]);

  const resultLabel =
    selectedCategory === "all" ? "Todos os Comandos" : selectedCategory;

  // ── Keyboard shortcuts ───────────────────────────────────────────────
  useKeyboardShortcuts({
    // Focus search bar
    "/": {
      handler: () => searchRef.current?.focus(),
    },
    // Clear search and blur
    Escape: {
      handler: () => {
        if (shortcutsOpen) {
          setShortcutsOpen(false);
          return;
        }
        setSearchValue("");
        searchRef.current?.blur();
      },
      allowInInput: true,
    },
    // Toggle shortcuts help
    "?": {
      handler: () => setShortcutsOpen((v) => !v),
    },
    // Category shortcuts (1–7 map to categories array)
    ...Object.fromEntries(
      categories.map((cat, i) => [
        String(i + 1),
        { handler: () => setSelectedCategory(cat.id) },
      ])
    ),
  });

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchRef={searchRef}
        onOpenShortcuts={() => setShortcutsOpen(true)}
      />

      <ShortcutsHelp
        open={shortcutsOpen}
        onOpenChange={setShortcutsOpen}
      />

      <main id="main-content">
        <div className="container py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar — category filter */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Main content — command grid */}
            <section
              aria-labelledby="results-heading"
              className="min-w-0 flex-1"
            >
              <header className="mb-6">
                <h2
                  id="results-heading"
                  className="text-2xl font-bold leading-tight"
                >
                  {resultLabel}
                </h2>
                <p
                  className="mt-1 text-sm text-muted-foreground"
                  aria-live="polite"
                >
                  {filteredCommands.length}{" "}
                  {filteredCommands.length !== 1
                    ? "comandos encontrados"
                    : "comando encontrado"}
                </p>
              </header>

              {filteredCommands.length > 0 ? (
                <div
                  className="grid grid-cols-1 gap-5 md:grid-cols-2"
                  role="region"
                  aria-label="Lista de comandos"
                  aria-live="polite"
                >
                  {filteredCommands.map((command) => (
                    <CommandCard key={command.id} command={command} />
                  ))}
                </div>
              ) : (
                <div
                  role="status"
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                    aria-hidden="true"
                  >
                    <Search className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    Nenhum comando encontrado
                  </h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Tente ajustar sua busca ou explorar outras categorias para
                    encontrar o comando que você procura.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-border">
        <div className="container py-8">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h2 className="mb-3 text-sm font-semibold">LinuxLib Pro</h2>
              <p className="text-sm text-muted-foreground">
                Uma referência completa de comandos Linux para profissionais e
                entusiastas.
              </p>
            </div>
            <nav aria-label="Links rápidos">
              <h2 className="mb-3 text-sm font-semibold">Links Rápidos</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/gabrielfcoelh83/LinuxLib"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    GitHub do projeto
                  </a>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    Página inicial
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <h2 className="mb-3 text-sm font-semibold">Sobre</h2>
              <p className="text-sm text-muted-foreground">
                Desenvolvido com React 19, TypeScript e Tailwind CSS 4.
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>© 2026 LinuxLib Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
