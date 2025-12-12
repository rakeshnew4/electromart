import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { useState } from "react";
import { cartStorage } from "@/lib/cart";
import Home from "@/pages/home";
import ProductDetail from "@/pages/product-detail";
import Checkout from "@/pages/checkout";
import AdminPage from "@/pages/admin";
import OrderConfirmation from "@/pages/order-confirmation";
import NotFound from "@/pages/not-found";

function Router() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(cartStorage.get());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const updateCart = () => {
    setCartItems(cartStorage.get());
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    cartStorage.update(productId, quantity);
    updateCart();
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleRemove = (productId: string) => {
    cartStorage.remove(productId);
    updateCart();
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <>
      <Switch>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/order-confirmation">
          <OrderConfirmation />
        </Route>
        <Route path="/product/:id">
          <>
            <Header
              onCartClick={() => {
                updateCart();
                setIsCartOpen(true);
              }}
              onSearchChange={setSearchQuery}
              searchQuery={searchQuery}
            />
            <ProductDetail />
          </>
        </Route>
        <Route path="/">
          <>
            <Header
              onCartClick={() => {
                updateCart();
                setIsCartOpen(true);
              }}
              onSearchChange={setSearchQuery}
              searchQuery={searchQuery}
            />
            <Home
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </>
        </Route>
        <Route component={NotFound} />
      </Switch>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
