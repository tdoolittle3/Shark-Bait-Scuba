import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Award, Map, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1544551763-46a013bb70d5)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Discover the Gulf Coast
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Experience world-class diving in Northwest Florida with Shark Bait Scuba. From springs to wrecks, we'll guide your underwater adventure.
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

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Shark Bait Scuba?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <Award className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>PADI Certified</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Learn from expert instructors with years of experience in Gulf Coast waters.
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <Map className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Prime Locations</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Access to exclusive dive sites, from crystal springs to historic wrecks.
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Top-quality equipment and rigorous safety standards for peace of mind.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-primary rounded-lg p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join us for world-class diving experiences in Northwest Florida's most beautiful underwater locations.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Contact Us Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}