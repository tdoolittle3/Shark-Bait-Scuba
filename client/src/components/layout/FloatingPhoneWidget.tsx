import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingPhoneWidget() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="tel:850-366-2437"
        className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full shadow-lg transition-colors"
      >
        <Phone className="h-5 w-5" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">Call or Text</span>
          <span className="font-bold">850-366-2437</span>
        </div>
      </a>
    </div>
  );
}