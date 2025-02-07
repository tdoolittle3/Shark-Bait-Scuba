import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Shield, Users } from "lucide-react";
import { getImagePath } from "@/lib/utils";

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Shark Bait Scuba</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Since 2010, we've been helping divers of all levels explore the underwater world safely and confidently.
        </p>
        <p className="text-muted-foreground">
          Our mission is to provide exceptional scuba diving experiences through professional instruction, quality equipment, and unforgettable adventures.
        </p>
      </div>

      {/* Instructor Profile */}
      <Card className="max-w-3xl mx-auto mb-12">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden shrink-0">
              <img
                src={getImagePath('about/IMG_20250128_154008.jpg')}
                alt="Robby Doolittle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Robby Doolittle</h2>
              <p className="text-primary font-medium mb-4">PADI Open Water Scuba Instructor #423428</p>
              <p className="text-muted-foreground mb-6">
                With over 15 years of diving experience and thousands of successful certifications, Mike brings unparalleled expertise to every class. His patient teaching style and commitment to safety have made him one of the most sought-after instructors in Northwest Florida.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">5000+</p>
                  <p className="text-sm text-muted-foreground">Dives</p>
                </div>
                <div>
                  <Award className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">1000+</p>
                  <p className="text-sm text-muted-foreground">Certifications</p>
                </div>
                <div>
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">15+ Years</p>
                  <p className="text-sm text-muted-foreground">Experience</p>
                </div>
                <div>
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-medium">100%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certifications Section */}
      <div className="bg-muted/30 rounded-lg p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Our Certifications</h2>
        <p className="text-muted-foreground mb-4">
          We're proud to be a PADI 5-Star Dive Center, meeting the highest standards in the diving industry. Our lead instructor holds multiple specialty certifications and maintains active status with all major diving organizations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4">
            <h3 className="font-bold mb-2">PADI</h3>
            <p className="text-sm text-muted-foreground">Course Director #54321</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-2">SSI</h3>
            <p className="text-sm text-muted-foreground">Advanced Instructor</p>
          </div>
          <div className="p-4">
            <h3 className="font-bold mb-2">DAN</h3>
            <p className="text-sm text-muted-foreground">First Aid Instructor</p>
          </div>
        </div>
      </div>
    </div>
  );
}