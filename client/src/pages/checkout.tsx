import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cartStorage } from "@/lib/cart";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/pages/firebase";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

// FIX TypeScript error:
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}



export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const cartItems = cartStorage.get();
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal >= 50 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [orderId, setOrderId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // --------------------------
  // Initialize Recaptcha Only ONCE
  // --------------------------
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        }
      );
    }
  }, []);

  // -------------------------------------
  // Step 1: Create order + send OTP
  // -------------------------------------
  // const handlePlaceOrder = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSendingOtp(true);
  //   try {
  //     // Create order in backend
  //     const resp = await apiRequest("POST", "/api/orders", {
  //       customerInfo: {
  //         name: formData.name,
  //         email: formData.email,
  //         phone: formData.phone,
  //       },
  //       shippingAddress: {
  //         street: formData.address,
  //         city: formData.city,
  //         state: formData.state,
  //         zip: String(formData.zip),
  //       },
  //       totalAmount: Number(total.toFixed(2)),
  //       items: cartStorage.get(),
  //     });
  //     const order = await resp.json();
  //     setOrderId(String(order.orderId));

  //     // Firebase OTP
  //     const phoneWithCode = "+91" + formData.phone;

  //     const appVerifier = window.recaptchaVerifier;

  //     const result = await signInWithPhoneNumber(
  //       auth,
  //       phoneWithCode,
  //       appVerifier
  //     );
  //     window.confirmationResult = result;

  //     toast({ title: "OTP Sent", description: "Check your SMS inbox." });
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "Failed",
  //       description: "Could not place order or send OTP.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSendingOtp(false);
  //   }
  // };

  const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSendingOtp(true);

  try {
    // 1️⃣ Create order in backend
    const resp = await apiRequest("POST", "/api/orders", {
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zip: String(formData.zip),
      },
      totalAmount: Number(total.toFixed(2)),
      items: cartStorage.get(),
    });

    const order = await resp.json();
    const orderId = String(order.orderId);
    setOrderId(orderId);

    // 2️⃣ Build WhatsApp message
    const itemsText = cartStorage
      .get()
      .map(
        (item: any, idx: number) =>
          `${idx + 1}. ${item.name} x${item.quantity} - ₹${item.price}`
      )
      .join("\n");
      
    const message = `
🛒 *My order Details*

📦 *Order ID:* ${orderId}

👤 *Customer:* ${formData.name}
📞 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email || "N/A"}

🏠 *Address:*
${formData.address}
${formData.city}, ${formData.state} - ${formData.zip}

🧾 *Items:*
${itemsText}

//     `.trim();

    // 3️⃣ Open WhatsApp
    const businessNumber = "918309227948"; // 🔴 CHANGE to your WhatsApp number (with country code)
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(
      message
    )}`;
    cartStorage.clear();
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Order placed",
      description: "You will be redirected to WhatsApp to confirm the order.",
    });

  } catch (error) {
    console.error(error);
    toast({
      title: "Order failed",
      description: "Could not place order. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSendingOtp(false);
  }
};


  // -------------------------------------
  // Step 2: Verify OTP
  // -------------------------------------
  const handleVerifyOtp = async () => {
    if (!orderId) return;

    setIsVerifying(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      console.log("OTP Verified:", result.user.uid);

      toast({ title: "OTP Verified!", description: "Order Confirmed." });

      cartStorage.clear();
      window.dispatchEvent(new Event("cart-updated"));

      setLocation(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" className="mb-6" onClick={() => setLocation("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Invisible recaptcha */}
        <div id="recaptcha-container"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form className="lg:col-span-2 space-y-6" onSubmit={handlePlaceOrder}>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(formData).map(([key, value]) => (
                  <div className="space-y-2" key={key}>
                    <Label htmlFor={key}>{key.toUpperCase()}</Label>
                    <Input
                      id={key}
                      value={value}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                      required
                      disabled={!!orderId}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {!orderId && (
              <Button className="w-full" size="lg" disabled={isSendingOtp}>
                {isSendingOtp ? "Opening Whatsapp..." : `Place Order - ₹${total.toFixed(2)}`}
                
              </Button>
            )}
            

          </form>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <img
                      src={item.imageUrl}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <Separator />

                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span> <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>{" "}
                    <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span> <span>₹{tax.toFixed(2)}</span>
                  </div>

                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span> <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
