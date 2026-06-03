import { Command } from "@/data/commands";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
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
    <Card className="group relative overflow-hidden border-border/70 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-colors duration-300 group-hover:bg-primary/10" />

      <CardHeader className="relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="font-space-grotesk text-xl">{command.name}</CardTitle>
            <CardDescription className="mt-1">{command.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {command.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-4">
        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <code className="min-w-0 flex-1 break-words font-mono text-sm text-emerald-600 dark:text-emerald-400">
              {command.example}
            </code>
            <Button
              size="icon-sm"
              variant="ghost"
              onClick={handleCopy}
              className="flex-shrink-0"
              aria-label="Copiar comando"
            >
              <Copy className={`size-4 ${isCopied ? "text-primary" : "text-muted-foreground"}`} />
            </Button>
          </div>
        </div>

        <Separator />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              Ver detalhes
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-0">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">O que faz: </span>
                {command.explanation}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>

      <CardFooter className="relative z-10 flex items-center justify-between pt-0">
        <Badge variant="outline">{command.category}</Badge>
        <span className="flex items-center gap-1 text-sm font-medium text-primary">
          Saiba mais
          <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </CardFooter>
    </Card>
  );
}
