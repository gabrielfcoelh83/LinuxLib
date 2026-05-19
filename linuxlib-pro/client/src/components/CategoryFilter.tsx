import { categories } from "@/data/commands";
import { Button } from "@/components/ui/button";
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
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-4">
          Categorias
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category.id)}
              className="justify-start gap-2 flex-1 lg:flex-none"
            >
              {iconMap[category.icon]}
              <span className="hidden sm:inline">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
