import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  {
    group: "Busca",
    items: [
      { keys: ["/"], label: "Focar a barra de busca" },
      { keys: ["Esc"], label: "Limpar busca e desfazer foco" },
    ],
  },
  {
    group: "Categorias",
    items: [
      { keys: ["1"], label: "Todos os comandos" },
      { keys: ["2"], label: "Sistema" },
      { keys: ["3"], label: "Busca" },
      { keys: ["4"], label: "Arquivos" },
      { keys: ["5"], label: "Rede" },
      { keys: ["6"], label: "Containers" },
      { keys: ["7"], label: "Permissões" },
    ],
  },
  {
    group: "Geral",
    items: [{ keys: ["?"], label: "Mostrar / esconder esta ajuda" }],
  },
];

export default function ShortcutsHelp({ open, onOpenChange }: ShortcutsHelpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-syne">
            <span aria-hidden="true">⌨</span>
            Atalhos de teclado
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          {shortcuts.map((group) => (
            <section key={group.group} aria-labelledby={`group-${group.group}`}>
              <h3
                id={`group-${group.group}`}
                className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              >
                {group.group}
              </h3>
              <ul className="space-y-1.5" role="list">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-foreground">{item.label}</span>
                    <span className="flex items-center gap-1 shrink-0">
                      {item.keys.map((key) => (
                        <kbd
                          key={key}
                          className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground"
                        >
                          {key}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
