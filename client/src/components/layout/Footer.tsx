import { Link } from "wouter";
import { Fish, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Fish className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Shark Bait Scuba</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for scuba diving adventures in Northwest Florida since 2010.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <a 
                href="https://www.instagram.com/sharkbaitscubafl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/dive-sites", label: "Dive Sites" },
                { href: "/training", label: "Training Courses" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
                      {link.label}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>123 Ocean Drive</li>
              <li>Pensacola Beach, FL 32561</li>
              <li className="font-medium">info@sharkbaitscuba.com</li>
              <li className="font-medium">(850) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 Shark Bait Scuba. All rights reserved.</p>
            <div className="flex gap-4">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
                Privacy Policy
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
                Terms of Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}