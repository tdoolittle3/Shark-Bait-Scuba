import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function CheckoutCancel() {
  const [, setLocation] = useLocation();

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader>
          <div className="mx-auto rounded-full bg-red-100 p-3 mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-center">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Your payment was cancelled. No charges were made.
          </p>
          <Button onClick={() => setLocation('/gear')}>
            Return to Gear
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
