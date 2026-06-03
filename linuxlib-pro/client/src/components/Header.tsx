import React from "react";
import { Keyboard, Terminal } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchRef?: React.RefObject<HTMLInputElement>;
  onOpenShortcuts?: () => void;
}

export default function Header({
  searchValue,
  onSearchChange,
  searchRef,
  onOpenShortcuts,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container py-5">
        <div className="flex flex-col gap-5">
          {/* Brand + shortcuts button */}
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

            {onOpenShortcuts && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onOpenShortcuts}
                aria-label="Ver atalhos de teclado"
                aria-keyshortcuts="?"
                className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Keyboard className="h-3.5 w-3.5" aria-hidden="true" />
                Atalhos
                <kbd className="ml-0.5 inline-flex h-4 items-center rounded border border-border bg-muted px-1 font-mono text-[10px]">
                  ?
                </kbd>
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="max-w-2xl">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              inputRef={searchRef}
              placeholder="Buscar comandos (ex: grep, docker, ssh)..."
            />
          </div>
        </div>
      </div>
    </header>
  );
}
