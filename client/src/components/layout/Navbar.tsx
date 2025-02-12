import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { href: "/diving", label: "Diving" },
    { href: "/training", label: "Training" },
    { href: "/dive-sites", label: "Dive Sites" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { 
      href: "https://store.sharkbaitscubafl.com", 
      label: "Store", 
      icon: <ShoppingBag className="h-4 w-4 mr-1" /> 
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
      {/* Water ripple effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 opacity-75" />

      {/* Wave decoration */}
      <div 
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%230891b2' fill-opacity='0.6' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px'
        }}
      />

      <nav className="container flex h-16 sm:h-20 md:h-24 items-center justify-between px-6 relative">
        <Link href="/" className="flex-shrink-0">
          <img 
            src="/images/sb_scuba.png" 
            alt="Shark Bait Scuba Logo" 
            className="h-10 sm:h-12 md:h-14 w-auto transition-all" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-grow justify-end">
          <div className="flex items-center space-x-4 pr-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="outline"
                  className={cn(
                    "text-sm md:text-base font-medium transition-all duration-200 hover:scale-105 border-2 hover:bg-primary/20 hover:border-primary flex items-center",
                    location === link.href ? "bg-primary/10 border-primary text-primary shadow-sm" : "border-muted-foreground/20",
                    link.label === "Store" && "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                  )}
                >
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
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
                      "w-full justify-start text-lg flex items-center",
                      location === link.href && "text-primary",
                      link.label === "Store" && "bg-primary/10 text-primary"
                    )}
                  >
                    {link.icon}
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