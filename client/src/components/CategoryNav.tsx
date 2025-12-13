import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { id: "all", label: "All Products" },
];

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryNav({ selectedCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="whitespace-nowrap"
              data-testid={`button-category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
