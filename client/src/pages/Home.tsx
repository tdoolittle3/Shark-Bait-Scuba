import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getImagePath } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${getImagePath('hero/hero-banner.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Private Scuba Training and Guiding
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experience personalized scuba training and guiding in Pensacola, Florida.
          </p>
          <div>
            <Link href="/about">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                Meet Your Instructor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}