import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { getImagePath } from "@/lib/utils";
import { useState, useEffect } from "react";

const taglines = [
  {
    title: "Private Scuba Training and Guiding",
    subtitle: "Experience personalized scuba training and guiding in Pensacola, Florida.",
    buttonText: "Meet Your Instructor",
    buttonLink: "/about"
  },
  {
    title: "Explore Northwest Florida's Dive Sites",
    subtitle: "From pristine springs to historic wrecks, discover the best diving spots.",
    buttonText: "View Dive Sites",
    buttonLink: "/dive-sites"
  },
  {
    title: "Professional PADI Certification Courses",
    subtitle: "Start your diving journey or advance your skills with certified instruction.",
    buttonText: "Browse Courses",
    buttonLink: "/training"
  }
];

export default function Home() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTagline((current) => (current + 1) % taglines.length);
        setIsTransitioning(false);
      }, 500); // Wait for fade out before changing content
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

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
          <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {taglines[currentTagline].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              {taglines[currentTagline].subtitle}
            </p>
            <div>
              <Link href={taglines[currentTagline].buttonLink}>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                  {taglines[currentTagline].buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}