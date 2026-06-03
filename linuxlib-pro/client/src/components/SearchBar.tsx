import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar comandos...",
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
        id="command-search"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 pl-10 pr-10 bg-card border-border focus:border-primary"
        autoComplete="off"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          aria-label="Limpar busca"
          className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      )}
    </form>
  );
}
