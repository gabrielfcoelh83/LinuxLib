import { Terminal } from "lucide-react";
import { Link } from "wouter";
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container py-5">
        <div className="flex flex-col gap-5">
          {/* Brand — links back to landing */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
              aria-label="Voltar para a página inicial do LinuxLib Pro"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <Terminal className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
              </span>
              <div>
                <p className="font-syne text-2xl font-bold leading-none">
                  LinuxLib Pro
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Referência de comandos Linux
                </p>
              </div>
            </Link>
          </div>

          {/* Search */}
          <div className="max-w-2xl">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Buscar comandos (ex: grep, docker, ssh)..."
            />
          </div>
        </div>
      </div>
    </header>
  );
}
