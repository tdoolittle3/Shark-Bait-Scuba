declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getImagePath } from "@/lib/utils";
import { useState, useEffect } from "react";

const taglines = [
  {
    title: "Private Scuba Training and Guiding",
    subtitle: "Personalized scuba training and guiding around Pensacola, Florida",
    buttonText: "Meet Your Instructor",
    buttonLink: "/about"
  },
  {
    title: "Explore Northwest Florida's Dive Sites",
    subtitle: "From offshore wrecks, shore dives, and natural springs- there is something for everyone",
    buttonText: "View Dive Sites",
    buttonLink: "/dive-sites"
  },
  {
    title: "PADI Scuba Courses",
    subtitle: "Start your diving journey or advance your skills",
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
      }, 500);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
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
        <div className="container relative z-10 px-4 sm:px-6 mx-auto max-w-7xl">
          <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'} text-white text-center`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {taglines[currentTagline].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
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
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Check It Out</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="mx-auto">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DFyEa1ePI5u/"
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
                data-instgrm-permalink="https://www.instagram.com/p/DFx43QzOhpf/"
                data-instgrm-version="14"
              />
            </div>
            <div className="mx-auto">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/reel/DFyElWpvtCE/"
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