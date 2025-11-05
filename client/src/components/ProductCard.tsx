import { Product } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const rating = parseFloat(product.rating);
  const inStock = parseInt(product.inStock.toString());

  return (
    <Card className="group overflow-hidden hover-elevate active-elevate-2 transition-all duration-200" data-testid={`card-product-${product.id}`}>
      <Link href={`/product/${product.id}`}>
        <a className="block">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-testid={`img-product-${product.id}`}
            />
          </div>
        </a>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <a className="block">
            <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
          </a>
        </Link>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
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
            ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold" data-testid={`text-price-${product.id}`}>
            ${parseFloat(product.price).toFixed(2)}
          </span>
          {inStock < 5 && inStock > 0 && (
            <Badge variant="secondary" className="text-xs">
              Only {inStock} left
            </Badge>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.colors.slice(0, 3).map((color, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {color}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          disabled={inStock === 0}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
