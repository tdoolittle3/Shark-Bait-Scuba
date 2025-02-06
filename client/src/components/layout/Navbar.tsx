import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Fish } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { href: "/dive-sites", label: "Dive Sites" },
    { href: "/training", label: "Training" },
    { href: "/gear", label: "Gear" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Fish className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">Shark Bait Scuba</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 flex-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "text-sm font-medium transition-colors",
                  location === link.href && "text-primary"
                )}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <Button className="md:hidden" variant="ghost">
          Menu
        </Button>
      </nav>
    </header>
  );
}