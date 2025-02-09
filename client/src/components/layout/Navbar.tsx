import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { href: "/diving", label: "Diving" },
    { href: "/training", label: "Training" },
    { href: "/dive-sites", label: "Dive Sites" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <img 
            src="/images/sb_scuba.png" 
            alt="Shark Bait Scuba Logo" 
            className="h-10 w-auto" // Increased from h-8 to h-10
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between flex-1">
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location === link.href && "text-primary"
                  )}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-lg",
                      location === link.href && "text-primary"
                    )}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}