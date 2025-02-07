import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    }, 8000); // Change every 8 seconds

    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      clearInterval(timer);
      if (script && script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleNavigation = (direction: 'prev' | 'next') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTagline((current) => {
        if (direction === 'prev') {
          return current === 0 ? taglines.length - 1 : current - 1;
        } else {
          return (current + 1) % taglines.length;
        }
      });
      setIsTransitioning(false);
    }, 500);
  };

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

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full"
            onClick={() => handleNavigation('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white rounded-full"
            onClick={() => handleNavigation('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Follow Our Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Replace these blockquotes with your actual Instagram post URLs */}
            <div className="mx-auto">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DFx43QzOhpf/"
                data-instgrm-version="14"
              />
            </div>
            <div className="mx-auto">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DFyEJ9BvHVO/"
                data-instgrm-version="14"
              />
            </div>
            <div className="mx-auto">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DFyEa1ePI5u/"
                data-instgrm-version="14"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <a 
              href="https://www.instagram.com/sharkbaitscubafl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <span className="font-medium">Follow us on Instagram</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}