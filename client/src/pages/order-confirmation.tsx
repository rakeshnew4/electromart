import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Home } from "lucide-react";

export default function OrderConfirmation() {
  const [, setLocation] = useLocation();
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");
    if (id) {
      setOrderId(id);
    } else {
      setLocation("/");
    }
  }, []);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Order Number</span>
              <span className="font-mono font-semibold" data-testid="text-order-id">
                #{orderId.slice(0, 8).toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border">
                <Package className="h-8 w-8 text-primary mb-2" />
                <p className="font-semibold text-sm">Order Confirmed</p>
                <p className="text-xs text-muted-foreground">Your order is being prepared</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <Truck className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="font-semibold text-sm">Shipping Soon</p>
                <p className="text-xs text-muted-foreground">We'll notify you when shipped</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/50">
                <Home className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="font-semibold text-sm">Delivery</p>
                <p className="text-xs text-muted-foreground">Estimated 5-7 business days</p>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm">
                <strong>What's next?</strong> You'll receive a confirmation email shortly with your order details and tracking information once your package ships.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            onClick={() => setLocation("/")}
            data-testid="button-continue-shopping"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
