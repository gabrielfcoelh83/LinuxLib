import { useState, useMemo } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import CommandCard from "@/components/CommandCard";
import { commands } from "@/data/commands";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter commands based on search and category
  const filteredCommands = useMemo(() => {
    return commands.filter((command) => {
      const matchesSearch =
        command.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        command.description.toLowerCase().includes(searchValue.toLowerCase()) ||
        command.example.toLowerCase().includes(searchValue.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || command.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchValue, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />

      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Card className="mb-8 border-primary/10 bg-gradient-to-br from-primary/5 to-card">
              <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground font-space-grotesk mb-2">
                    {selectedCategory === "all"
                      ? "Todos os Comandos"
                      : `Categoria: ${selectedCategory}`}
                  </h2>
                  <p className="text-muted-foreground">
                    Explore comandos, exemplos e explicações em um único lugar.
                  </p>
                </div>

                <Badge variant="secondary" className="w-fit">
                  {filteredCommands.length} comando
                  {filteredCommands.length !== 1 ? "s" : ""}
                </Badge>
              </CardContent>
            </Card>

            <Separator className="mb-8" />

            {/* Commands Grid */}
            {filteredCommands.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCommands.map((command) => (
                  <CommandCard key={command.id} command={command} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhum comando encontrado
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Tente ajustar sua busca ou explorar outras categorias para
                    encontrar o comando que você procura.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">LinuxLib Pro</h4>
              <p className="text-sm text-muted-foreground">
                Uma biblioteca completa de comandos Linux para profissionais e
                entusiastas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentação
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                Desenvolvido com React, Tailwind CSS e muito ❤️
              </p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 LinuxLib Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
