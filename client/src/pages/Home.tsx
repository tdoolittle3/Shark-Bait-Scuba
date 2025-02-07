import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Award, Users, Shield, Clock } from "lucide-react";
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
            Private Scuba Instruction and Guiding
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

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Private Instruction Advantages</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover the benefits of personalized scuba training with our expert instructors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>One-on-One Attention</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Dedicated instruction tailored to your learning style and pace.
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <Clock className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Flexible Schedule</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Training sessions scheduled around your availability.
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <Award className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Learn from PADI-certified instructors with years of experience.
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle>Safety Focus</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Enhanced safety with personal supervision throughout your training.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Personalized Learning Experience</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our private instruction program is designed to help you become a confident and skilled diver. Whether you're a complete beginner or looking to advance your certification, we'll create a custom training plan that meets your goals.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">✓ Custom-paced learning program</p>
              <p className="text-muted-foreground">✓ Hands-on equipment familiarization</p>
              <p className="text-muted-foreground">✓ Real-time feedback and adjustment</p>
              <p className="text-muted-foreground">✓ Focus on your specific interests</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="bg-primary rounded-lg p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Private Training Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Book your one-on-one scuba instruction and begin your personalized underwater journey.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Schedule Your First Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}