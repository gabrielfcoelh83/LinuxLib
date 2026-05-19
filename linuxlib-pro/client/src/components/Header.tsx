import { Terminal } from "lucide-react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Terminal className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground font-space-grotesk">
                LinuxLib Pro
              </h1>
              <p className="text-sm text-muted-foreground">
                Sua biblioteca definitiva de comandos Linux
              </p>
            </div>
          </div>

          {/* Search Bar */}
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
