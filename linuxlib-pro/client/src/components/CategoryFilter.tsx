import { categories, commands } from "@/data/commands";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Grid3x3,
  Settings,
  Search,
  Network,
  Box,
  Lock,
  FileText,
} from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Grid3x3: <Grid3x3 className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
  Search: <Search className="w-4 h-4" />,
  Network: <Network className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  Lock: <Lock className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
};

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const categoryCounts = commands.reduce<Record<string, number>>((counts, command) => {
    counts[command.category] = (counts[command.category] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <Card className="sticky top-24 overflow-hidden">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-base font-space-grotesk">Categorias</CardTitle>
          <CardDescription>Filtre a biblioteca por tema.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="h-[calc(100vh-14rem)] pr-3">
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                const count = category.id === "all"
                  ? commands.length
                  : categoryCounts[category.id] ?? 0;

                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => onSelectCategory(category.id)}
                    className="justify-between gap-3 flex-1 lg:flex-none"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {iconMap[category.icon]}
                      <span className="truncate">{category.name}</span>
                    </span>
                    <Badge variant={isActive ? "secondary" : "outline"} className="shrink-0">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </aside>
  );
}
