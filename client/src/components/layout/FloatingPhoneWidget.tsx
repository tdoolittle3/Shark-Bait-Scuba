import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingPhoneWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="tel:850-366-2437"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105"
      >
        <Phone className="h-5 w-5" />
        <span className="font-medium">850-366-2437</span>
      </a>
    </div>
  );
}
