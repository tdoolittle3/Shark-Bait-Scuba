import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1544551763-46a013bb70d5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Dive Into Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experience the thrill of underwater exploration with Shark Bait Scuba. Professional training, guided dives, and top-tier equipment.
          </p>
          <div className="space-x-4">
            <Link href="/training">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dive-sites">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                Explore Dive Sites
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Shark Bait Scuba?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Instructors",
                description: "PADI-certified professionals with years of experience teaching divers of all levels."
              },
              {
                title: "Premium Equipment",
                description: "Top-quality gear from leading manufacturers, maintained to the highest standards."
              },
              {
                title: "Amazing Locations",
                description: "Access to the most breathtaking dive sites with diverse marine life."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
