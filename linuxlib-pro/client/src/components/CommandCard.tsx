import { Command } from "@/data/commands";
import { Button } from "@/components/ui/button";
import { Copy, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CommandCardProps {
  command: Command;
}

export default function CommandCard({ command }: CommandCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command.example);
    setIsCopied(true);
    toast.success("Comando copiado!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 overflow-hidden">
      {/* Background accent */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-foreground font-space-grotesk">
              {command.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {command.description}
            </p>
          </div>
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {command.category}
          </span>
        </div>

        {/* Code Example */}
        <div className="my-4 bg-slate-900 dark:bg-slate-950 rounded-md p-3 border border-slate-700 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-green-400 break-all">
              {command.example}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="ml-2 flex-shrink-0 hover:bg-primary/20"
            >
              <Copy className={`w-4 h-4 ${isCopied ? "text-primary" : "text-muted-foreground"}`} />
            </Button>
          </div>
        </div>

        {/* Explanation */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">O que faz: </span>
            {command.explanation}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all duration-300">
          Saiba mais
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}
