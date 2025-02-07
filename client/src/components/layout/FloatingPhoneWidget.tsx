import { Phone, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "wouter";

export default function FloatingPhoneWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-64 shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Contact Us</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <a
                href="tel:850-366-2437"
                className="flex items-center gap-2 w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-medium">Call Now</span>
              </a>

              <Link href="/contact">
                <button className="flex items-center gap-2 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">Send Message</span>
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}