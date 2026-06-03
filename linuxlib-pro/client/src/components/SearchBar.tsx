import React from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar comandos...",
  inputRef,
}: SearchBarProps) {
  return (
    <form
      role="search"
      aria-label="Buscar comandos Linux"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full"
    >
      <label htmlFor="command-search" className="sr-only">
        Buscar comandos Linux
      </label>
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-5 w-5" aria-hidden="true" />
      </div>
      <Input
        ref={inputRef}
        id="command-search"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 pl-10 pr-24 bg-card border-border focus:border-primary"
        autoComplete="off"
        aria-keyshortcuts="/"
      />
      {/* Keyboard hint */}
      {!value && (
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1"
          aria-hidden="true"
        >
          <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1 font-mono text-[10px] text-muted-foreground">
            /
          </kbd>
        </span>
      )}
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          aria-label="Limpar busca (Esc)"
          className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </form>
  );
}
