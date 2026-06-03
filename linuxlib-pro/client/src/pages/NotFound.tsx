import { Terminal } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card"
        aria-hidden="true"
      >
        <Terminal className="h-8 w-8 text-primary" />
      </div>

      <p className="font-mono text-sm font-medium text-muted-foreground">
        erro 404
      </p>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-sm text-base text-muted-foreground">
        O endereço que você acessou não existe ou foi movido.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/">
          <Button variant="default">Voltar ao início</Button>
        </Link>
        <Link href="/app">
          <Button variant="outline">Abrir biblioteca</Button>
        </Link>
      </div>
    </div>
  );
}
