import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function CheckoutSuccess() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // You could implement order status verification here
  }, []);

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="mx-auto rounded-full bg-green-100 p-3 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-center">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. You will receive an email confirmation shortly.
          </p>
          <Button onClick={() => setLocation('/gear')}>
            Return to Gear
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
