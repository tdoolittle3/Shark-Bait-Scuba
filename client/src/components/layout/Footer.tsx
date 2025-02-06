import { Fish } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <Fish className="h-6 w-6 text-primary" />
              <span className="font-bold">Shark Bait Scuba</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in underwater adventures since 2010
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>Dive Sites</li>
              <li>Training Courses</li>
              <li>Equipment</li>
              <li>About Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Ocean Drive</li>
              <li>Coral Bay, FL 33019</li>
              <li>info@sharkbaitscuba.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li>Mon-Fri: 8am - 6pm</li>
              <li>Sat: 7am - 7pm</li>
              <li>Sun: 7am - 5pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2024 Shark Bait Scuba. All rights reserved.
        </div>
      </div>
    </footer>
  );
}