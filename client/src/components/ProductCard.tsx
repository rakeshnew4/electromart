import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ✅ Defensive parsing
  const rating = Number(product.rating) || 0;
  const inStock = Number(product.inStock) || 0;
  const price = Number(product.price) || 0;
  const reviewCount = Number(product.reviewCount) || 0;

  return (
    <Card
      className="group overflow-hidden transition-all duration-200 hover:shadow-lg"
      data-testid={`card-product-${product.id}`}
    >
      {/* 🖼️ Non-clickable image */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          data-testid={`img-product-${product.id}`}
        />
      </div>

      <CardContent className="p-4">
        {/* 🏷️ Product name (non-clickable) */}
        <h3
          className="mb-2 line-clamp-2 text-lg font-semibold"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>

        {/* ⭐ Rating */}
        <div className="mb-2 flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({reviewCount})
          </span>
        </div>

        {/* 💰 Price + Stock */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="text-2xl font-bold"
            data-testid={`text-price-${product.id}`}
          >
            ₹{price.toFixed(2)}
          </span>

          {inStock > 0 && inStock < 5 && (
            <Badge variant="secondary" className="text-xs">
              Only {inStock} left
            </Badge>
          )}
        </div>

        {/* 🎨 Colors */}
        {Array.isArray(product.colors) && product.colors.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.colors.slice(0, 3).map((color, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {color}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* 🛒 Add to Cart */}
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={inStock === 0}
          onClick={() => onAddToCart(product)}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {inStock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
