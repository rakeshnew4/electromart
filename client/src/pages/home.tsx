import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/ProductCard";
import { CategoryNav } from "@/components/CategoryNav";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Truck, Heart } from "lucide-react";
import { cartStorage } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/Resin_art_crafting_process_79d2f1ba.png";

interface HomeProps {
  searchQuery: string;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Home({ searchQuery, selectedCategory, onCategoryChange }: HomeProps) {
  const { toast } = useToast();
  
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const handleAddToCart = (product: Product) => {
    cartStorage.add({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    
    window.dispatchEvent(new Event("cart-updated"));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // const featuredProducts = products.filter(p => parseFloat(p.rating) >= 4.8).slice(0, 6);

  const clocks = products
  .filter(
    p =>
      p.name.toLowerCase().includes("clocks")
  );

  const photoframes = products
  .filter(
    p =>
      p.name.toLowerCase().includes("photoframe")
  );

  const nameplates = products
  .filter(
    p =>
      p.name.toLowerCase().includes("nameplate")
  );
  const varmala = products
  .filter(
    p =>
      p.name.toLowerCase().includes("varmala")
  );
  const pyramids = products
  .filter(
    p =>
      p.name.toLowerCase().includes("pyramid")
  );
  const wallarts = products
  .filter(
    p =>
      p.name.toLowerCase().includes("wall-art")
  );
  const poojaplatter = products
  .filter(
    p =>
      p.name.toLowerCase().includes("pooja-platter")
  );
  
  

  // const newArrivals = products
  //   .slice()
  //   .reverse()
  //   .slice(0, 6);
  const [activeTab, setActiveTab] = useState<"clocks" | "photoframes" | "nameplates" | "varmala" | "pyramids" | "poojaplatter" | "wallarts">("clocks");

  const tabProducts = {
    clocks: clocks,
    photoframes: photoframes,
    nameplates: nameplates,
    varmala: varmala,
    pyramids: pyramids,
    poojaplatter: poojaplatter,
    wallarts: wallarts,
  };

  return (
    <div className="min-h-screen bg-background">
      <CategoryNav selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Handcrafted resin art"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Handcrafted Resin Art
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Discover unique pieces that transform your space with vibrant colors and stunning designs
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => {
                  document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid="button-shop-now"
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-explore-collections"
              >
                Explore Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Handcrafted Quality</h3>
              <p className="text-sm text-muted-foreground">Each piece is uniquely made with care and precision</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On all orders over $50 within the US</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">Safe and encrypted payment processing</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Made with Love</h3>
              <p className="text-sm text-muted-foreground">Supporting independent artists and creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
{!searchQuery && selectedCategory === "all" && (
  <section id="featured-products" className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our most loved pieces, carefully selected for their exceptional beauty and craftsmanship
        </p>
      </div>
      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-10 border-b">
        {[
          { key: "clocks", label: "Wall clocks" },
          { key: "photoframes", label: "Photo Frames" },
          { key: "nameplates", label: "Name Plates" },
          { key: "varmala", label: "Varmala Preserve" },
          { key: "pyramids", label: "Pyramid Arts" },
          { key: "poojaplatter", label: "Pooja platter" },
          { key: "wallarts", label: "Wall-Arts" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`pb-3 px-4 text-lg font-medium transition-all
              ${
                activeTab === tab.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tabProducts[activeTab]?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

    </div>
  </section>
)}
      {/* Newsletter */}
<section className="py-16 bg-primary text-primary-foreground">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
    <p className="text-lg mb-8 text-primary-foreground/90">
      We’re here to help! Reach out to us anytime for custom orders, or support.
    </p>
    <div className="space-y-2 text-lg">
      <p>
        <span className="font-semibold">Address: Hingna, Maharashtra, India – 441110</span><br />

      </p>
      <p>
        <span className="font-semibold">WhatsApp:   
        <a 
          href="https://wa.me/918309227948"
          target="_blank"
          className="underline hover:text-secondary"
        >
          +91 8309227948
        </a>
        </span>
        <br />
      </p>

      <p>
        <span className="font-semibold">Instagram:  </span>
        <a 
          href="https://instagram.com/yourpage"
          target="_blank"
          className="underline hover:text-secondary"
        >
          @vkpremium
        </a>
      </p>
      <br />

      <p>
        <span className="font-semibold">Email:  </span>
        <a 
          href="mailto:supportvkarts@gmail.com"
          className="underline hover:text-secondary"
        >
          supportvkpremium@gmail.com
        </a>
        
      </p>
      <br />
    </div>
  </div>
</section>

    </div>
  );
}
