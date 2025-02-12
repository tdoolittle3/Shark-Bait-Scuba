
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "@/contexts/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CheckoutButtonProps {
  className?: string;
}

export function CheckoutButton({ className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { state } = useCart();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          items: state.items.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const { id: sessionId } = await response.json();
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading || state.items.length === 0}
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Checkout"
      )}
    </Button>
  );
}
